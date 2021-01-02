import React, {Component} from 'react';
import {lonLatZoomToZXY} from '../../helpers/mapHelpers'
import {TILEZEN_API_KEY} from '../../data/apiConfig'
import radarIndicator_Img from '../../media/radar-indicator.png'
import loading_Img from '../../media/radar-loading.png'
import "./Radar.css";

const pixels = require('image-pixels');
const imageDimensions = {width: 512, height: 512};
const zxyToImageUrl = ({z, x, y}) => `https://tile.nextzen.org/tilezen/terrain/v1/512/terrarium/${z}/${x}/${y}.png?api_key=${TILEZEN_API_KEY}`;

class Radar extends Component {
    constructor(props) {
        super(props);
        this.state = {isPreparingHeightmap: false};
        //This is not part of the state becuase it should not prompt an update.
        this.wasm = null;
        this.relBoatPos = undefined;
        this.radarIndicatorImg = new Image();
        this.radarIndicatorImg.src = radarIndicator_Img;
        this.loadingImg = new Image();
        this.loadingImg.src = loading_Img;
        //It would be better to use cancellable callbacks...
        this._isMounted = false;
    }
    
    //Will be called whenever one of the props changes, before the actual update.
    //However, we don't need to reload the heightmap if the area does not change
    getSnapshotBeforeUpdate(prevProps) {
        let prevTile = lonLatZoomToZXY(prevProps.radarCenter);
        let curTile = lonLatZoomToZXY(this.props.radarCenter);
        if (prevTile.x !== curTile.x || prevTile.y !== curTile.y)
        return {repositionMap: true};
        else
        return {repositionMap: false}
    }
    
    handleTilezenHTTPError(e) {
        if(e.message === "Bad image URL/path"){
            this.props.showError(
                "Could not retrieve height map from external source! "+ 
                "The height map is used to create the radar image. Try again soon.")
        }
    }
    
    async componentDidMount() {
        await this.loadWasm();
        this._isMounted = true;
        this.prepareForDrawing().then(() => {
            this.startContinousOutput();
        }).catch(e => {
            this.handleTilezenHTTPError(e);
        });
    }

    loadWasm = async () => {
        try {
          const wasm = await import('navirad_wasm');
          wasm.init_panic_hook();
          this.wasm = wasm;
        } catch(err) {
            this.props.showError("Error loading WASM library. Make sure browser supports it.")
            console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
        }
    };

    prepareForDrawing() {
        let cnv = document.getElementById("canvas");
        cnv.getContext("2d").drawImage(this.loadingImg, 0, 0);     
        let zxy = lonLatZoomToZXY(this.props.radarCenter);
        let imageUrl = zxyToImageUrl(zxy);
        
        return new Promise(function (resolve, reject) {
            pixels(imageUrl).then((obj) => {
                this.wasm.create_heightmap(obj.width, obj.data);
                this._isMounted && this.setState({isPreparingHeightmap: false});
                resolve();
            }).catch(e => {
                console.log("The tilezen servers sometimes are overloaded, and respond with " +
                    "a 503, this error is unfortunately hidden by the image library");
                console.error(e);
                reject(e)
            })
        }.bind(this));
    }

    componentDidUpdate(_prevProps, _state, snapshot) {
        if (snapshot.repositionMap) {
            this.setState({isPreparingHeightmap: true});
            this.stopContinuousOutput();

            this.prepareForDrawing().then((heightmap) => {
                this._isMounted && this.setState({currentHeightmap: heightmap});
                this.startContinousOutput();
            })
            .catch(function (e) { this.handleTilezenHTTPError(e); }.bind(this))
        }
    }

    //This code is ezily parallelizable. There will technically be a data race
    //But since the race would always be 2 threads setting some index to the same value, 
    //It is actually an acceptable compromize
    //Accepting the harmless data race, allows us to skip locks, and having to buffer our writes
    startContinousOutput() {
        if (this.intervalReference === undefined && this._isMounted) {
            this.intervalReference = setInterval(() => { 
                let cnv = document.getElementById("canvas");
                let zxy = lonLatZoomToZXY(this.props.radarCenter);
                this.relBoatPos = {
                    x: zxy.xRem * imageDimensions.width, 
                    y: zxy.yRem * imageDimensions.height
                };
                //let time = performance.now();
                this.wasm.draw_into_canvas(
                    this.relBoatPos.x, 
                    this.relBoatPos.y, 
                    this.props.radarSettings.beamwidth, 
                    this.props.radarSettings.rainInterference, 
                    this.props.radarSettings.radarInterference)
                //console.log(performance.now() - time);
                cnv.getContext("2d").drawImage(
                    this.radarIndicatorImg, 
                    this.relBoatPos.x - 4, 
                    this.relBoatPos.y - 4);
            }, 30)
        }
    }

    stopContinuousOutput() {
        this.intervalReference !== undefined && clearInterval(this.intervalReference);
        this.intervalReference = undefined;
    }

    componentWillUnmount() {
        this.stopContinuousOutput();
        this._isMounted = false;
    }

    render() {
        return (
            <div className="loader">
                <img src={loading_Img} alt="" className="loading-img"
                     style={{zIndex:10, display: this.state.isPreparingHeightmap ? "" : "none"}}/>
                <canvas id="canvas" width="512" height="512" alt="radar"/>
            </div>
        )
    }
}

export default Radar;