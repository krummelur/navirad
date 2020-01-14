import React, {Component} from "react";
import { zxyToTileCorner, lonLatZoomToZXY } from "../../helpers/mapHelpers"
import boatIndicator_img from '../../media/other-boat-indicator.png'

const wh = 512;

class OtherBoatsOverlay extends Component {
    constructor(props) {
        super(props)
        console.log("I LIVE AGAIN!")
        //this.props.fetchBoats()
        console.log(this.tileBounds());
        this.boatIndicatorImg = new Image();
        this.boatIndicatorImg.src = boatIndicator_img;
    }

    tileBounds() {
        let cTile = lonLatZoomToZXY(this.props.radarCenter);
        let upperLeft = zxyToTileCorner(cTile);
        let lowerRight = zxyToTileCorner({...cTile, x: cTile.x+1, y: cTile.y+1});
        //console.log(upperLeft);
        //console.log(lowerRight);
        let lats = {lower: Math.min(upperLeft.lat, lowerRight.lat),
                    upper: Math.max(upperLeft.lat, lowerRight.lat)}
        let lons= {lower: Math.min(upperLeft.lon, lowerRight.lon),
                    upper: Math.max(upperLeft.lon, lowerRight.lon)}
        return {'lats': lats, 'lons': lons}
    }

    boatsInBounds() {
        let bounds = this.tileBounds();
        console.log(bounds)
        return tempData.filter(o => 
            o.LONGITUDE > bounds.lons.lower &&
            o.LONGITUDE < bounds.lons.upper &&
            o.LATITUDE > bounds.lats.lower &&
            o.LATITUDE < bounds.lats.upper
        )
    }

    //Dont redraw completely unless we changed tile
    getSnapshotBeforeUpdate(prevProps) {
        let result = {shouldUpdate: false}
        let prevTile = lonLatZoomToZXY(prevProps.radarCenter);
        let curTile = lonLatZoomToZXY(this.props.radarCenter);
        if (prevTile.x !== curTile.x || prevTile.y !== curTile.y)
            return {shouldUpdate: true}
        if (prevProps.shouldDiplayBoats !== this.props.shouldDiplayBoats)
            return {shouldUpdate: true}
        return result;
    }

    clearCanvas() {    
        let context = document.getElementById("boats-canvas").getContext("2d")
        context.clearRect(0, 0, wh, wh)
    }

    renderIntoCanvas() {
        let img = this.boatIndicatorImg;
        let context = document.getElementById("boats-canvas").getContext("2d")
        setTimeout(function() {
            this.boatsInBounds().map( (b,i) => {
                let zxy = lonLatZoomToZXY({lat: b.LATITUDE, lon: b.LONGITUDE});
                context.drawImage(img, zxy.xRem*wh, zxy.yRem*wh)
            })
        }.bind(this), 10)
    }
    
    componentDidUpdate(prevProps, state, snapshot) {
        if (snapshot.shouldUpdate) {
            this.clearCanvas();
            if(this.props.shouldDiplayBoats)
                this.renderIntoCanvas();
        }
    }
    
    componentDidMount() {
        if(this.props.shouldDiplayBoats)
        this.renderIntoCanvas()
    }

    render() {
        return (
        <div className="boatsoverlay-canvas-container" id="boatcnvcont" style={{position: "absolute", zIndex: "9"}}>
            <canvas id="boats-canvas" height={wh} width={wh}/>
        </div>)
    }
}

export default OtherBoatsOverlay

const tempData = [];