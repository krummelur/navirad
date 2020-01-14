import React, {Component} from 'react';
import {lonLatZoomToZXY, degToRad} from '../../helpers/mapHelpers'
import {TILEZEN_API_KEY} from '../../data/apiConfig'
import radarIndicator_Img from '../../media/radar-indicator.png'
import loading_Img from '../../media/radar-loading.png'
import "./Radar.css";

//const assert = require('assert');
const pixels = require('image-pixels');
const output = require('image-output');

const imageDimensions = {width: 512, height: 512}

class Radar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreparingHeightmap: false,
            currentHeightmap: undefined
        };
        //This is not part of the state becuase it should not prompt an update.
        this.relBoatPos = undefined;
        this.radarIndicatorImg = new Image();
        this.radarIndicatorImg.src = radarIndicator_Img;
        this.loadingImg = new Image();
        this.loadingImg.src = loading_Img;
    }

    pixelDataToHeight = (r, g, b) => ((r * 256 + g + b / 256) - 32768);

    zxyToImageUrl = ({z, x, y}) => `https://tile.nextzen.org/tilezen/terrain/v1/512/terrarium/${z}/${x}/${y}.png?api_key=${TILEZEN_API_KEY}`;

    //Will be called whenever one of the props changes, before the actual update.
    //However, we don't need to reload the heightmap if the area does not change
    getSnapshotBeforeUpdate(prevProps) {
        let prevTile = lonLatZoomToZXY(prevProps.radarCenter);
        let curTile = lonLatZoomToZXY(this.props.radarCenter);
        if (prevTile.x !== curTile.x || prevTile.y !== curTile.y)
            return {repositionMap: true}
        else
            return {repositionMap: false}
    }

    componentDidMount() {
        this.prepareForDrawing().then((heightmap) => {
            this.setState({currentHeightmap: heightmap})
            this.startContinousOutput();
        }).catch()
    }

    prepareForDrawing() {
        this.setState({...this.state, isPreparingHeightmap: true});
        let cnv = document.getElementById("canvas");
        cnv.getContext("2d").drawImage(this.loadingImg, 0, 0)
        let zxy = lonLatZoomToZXY(this.props.radarCenter)
        let imageUrl = this.zxyToImageUrl(zxy);
        return new Promise(function (resolve, reject) {
            pixels(imageUrl).then((obj) => {
                let newData = obj.data.map((c, i) => {
                    if ((i + 1) % 4 === 0) return c;
                    let cRedIndex = Math.floor(i / 4) * 4;
                    let height = Math.max(this.pixelDataToHeight(obj.data[cRedIndex++], obj.data[cRedIndex++], obj.data[cRedIndex++]), 0)
                    return height > 8 ? height * 10 : 0
                })
                this.setState({isPreparingHeightmap: false});
                resolve({data: newData, width: obj.width, height: obj.height});
            }).catch(e => reject(e))
        }.bind(this));
    }

    componentDidUpdate(prevProps, state, snapshot) {
        if (snapshot.repositionMap) {
            this.setState({isPreparingHeightmap: true});
            this.stopContinuousOutput();
            this.prepareForDrawing().then((heightmap) => {
                this.startContinousOutput();
                this.setState({currentHeightmap: heightmap});
            }).catch(function (e) {
                this.props.showError("Could not download height data")
            }.bind(this))
        }
    }

    pixelDataAt(x, y, width, data) {
        let baseIndex = this.indexFromPos(Math.floor(x), Math.floor(y), width);
        return {
            r: data[baseIndex + 0],
            g: data[baseIndex + 1],
            b: data[baseIndex + 2],
            a: data[baseIndex + 3]
        }
    }

    indexFromPos(x, y, width) {
        if (x >= width || y >= width || y < 0 || x < 0)
            return undefined;
        return (Math.floor(x) + Math.floor(y) * width) * 4
    }

    processImage({data, width, height}) {
        let newPixelData = data.map((c, i) => {
            return (i + 3) % 4 === 0 ? 255 : 0
        })

        let angle = 0.0;
        let beamwidthRad = degToRad(this.props.radarSettings.beamwidth);
        while (angle < Math.PI * 2) {
            this.castRayInNormDirection({newPixelData, data, width, height}, {x: Math.sin(angle), y: Math.cos(angle)})
            //Angle is decided from the beamwidth
            angle += beamwidthRad;
        }
        //Add rain effect
        if (this.props.radarSettings.rainInterference)
            this.rainify(newPixelData, width, height);
        return {data: newPixelData, width: width, height: height};
    }

    rainify(image, width, height) {
        //TODO: make this into a map()
        let x = 0;
        let y = 0;
        while (y < height) {
            x = 0;
            while (x < width) {
                let bpdeltax = x - this.relBoatPos.x;
                let bpdeltay = y - this.relBoatPos.y;
                let distanceFromOriginSquared = bpdeltax * bpdeltax + bpdeltay * bpdeltay;
                let someNum = 70;
                if ((Math.random() - 0.5) * distanceFromOriginSquared > someNum * someNum || Math.random() > 0.95) {
                    image[this.indexFromPos(x, y, width) + 3] = 128;
                }
                x++
            }
            y++;
        }
    }

    castRayInNormDirection(image, dir) {
        let bp = this.relBoatPos;
        let nextPos = {x: bp.x, y: bp.y};
        let isHit = false;
        let min = 10;
        while (nextPos.x > 0 && nextPos.y > 0 && nextPos.x < image.width && nextPos.y < image.height) {
            let pixelAtPos = this.pixelDataAt(Math.floor(nextPos.x), Math.floor(nextPos.y), image.width, image.data).g;
            min = pixelAtPos >= min ? pixelAtPos : min;
            nextPos = {x: nextPos.x + dir.x, y: nextPos.y + dir.y}
            let bpdeltax = nextPos.x - bp.x;
            let bpdeltay = nextPos.y - bp.y;
            let distanceFromOriginSquared = bpdeltax * bpdeltax + bpdeltay * bpdeltay;
            if (this.props.radarSettings.radarInterference) {
                let shouldDrawRadarInterf = (Math.random() > 0.5);
                if (shouldDrawRadarInterf)
                    image.newPixelData[this.indexFromPos(nextPos.x, nextPos.y, image.width) + 3] = 220;
            }
            if (pixelAtPos === min && !isHit) {
                let distanceFromOrigin = Math.sqrt(distanceFromOriginSquared);
                image.newPixelData[this.indexFromPos(nextPos.x, nextPos.y, image.width) + 3] = pixelAtPos;
                //Approximation of errors due to beamwidth
                let errorLength = distanceFromOrigin * degToRad(this.props.radarSettings.beamwidth)
                let mat = [0, -1, 1, 0];
                let errorDir = {
                    x: dir.x * mat[0] + dir.y * mat[2],
                    y: (dir.x * mat[1] + dir.y * mat[3])
                }
                let nextErrLocation = {...nextPos};
                let errTraced = 0;
                while (errTraced < errorLength) {
                    let index = this.indexFromPos(Math.round(nextErrLocation.x), Math.round(nextErrLocation.y), image.width);
                    index && (image.newPixelData[index + 3] = pixelAtPos * 4);
                    nextErrLocation.x += errorDir.x;
                    nextErrLocation.y += errorDir.y;
                    errTraced++;
                }
            } else if (pixelAtPos < min - 50) //approximation of the radar "seeing over" things.
                isHit = true;
        }
        return isHit;
    }

    startContinousOutput() {
        if (this.intervalReference === undefined)
            this.intervalReference = setInterval(() => {
                let zxy = lonLatZoomToZXY(this.props.radarCenter);
                this.relBoatPos = {x: zxy.xRem * imageDimensions.width, y: zxy.yRem * imageDimensions.height};
                let cnv = document.getElementById("canvas")
                //let startTime = Date.now()
                let newPixelData = this.processImage(this.state.currentHeightmap)
                output(newPixelData, cnv)
                cnv.getContext("2d").drawImage(this.radarIndicatorImg, this.relBoatPos.x - 4, this.relBoatPos.y - 4)
                //let totalTime = Date.now() - startTime
                //console.log("Render Time: " + totalTime)
            }, 40)
    }

    stopContinuousOutput() {
        clearInterval(this.intervalReference);
        this.intervalReference = undefined;
    }

    componentWillUnmount() {
        this.stopContinuousOutput();
    }

    render() {
        return (
            <div className="loader">
                <img src={loading_Img} alt="" className="loading-img"
                     style={{display: this.state.isPreparingHeightmap ? "" : "none"}}/>
                <canvas id="canvas" width="512" height="512" alt="radar"/>
            </div>
        )
    }
}

export default Radar;