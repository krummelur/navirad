import React, { Component } from "react";
import { zxyToTileCorner, lonLatZoomToZXY } from "../../helpers/mapHelpers"
import boatIndicator_img from '../../media/boat.png'
import { isEqual } from 'lodash';

const wh = 512;

class OtherBoatsOverlay extends Component {
    constructor(props) {
        super(props)
        this.boatIndicatorImg = new Image();
    }

    tileBounds() {
        let cTile = lonLatZoomToZXY(this.props.radarCenter);
        let upperLeft = zxyToTileCorner(cTile);
        let lowerRight = zxyToTileCorner({ ...cTile, x: cTile.x + 1, y: cTile.y + 1 });
        let lats = {
            lower: Math.min(upperLeft.lat, lowerRight.lat),
            upper: Math.max(upperLeft.lat, lowerRight.lat)
        }
        let lons = {
            lower: Math.min(upperLeft.lon, lowerRight.lon),
            upper: Math.max(upperLeft.lon, lowerRight.lon)
        }
        return { 'lats': lats, 'lons': lons }
    }

    boatsInBounds() {
        let bounds = this.tileBounds();
        return this.props.otherBoats.boats.filter(o =>
            o.LONGITUDE > bounds.lons.lower &&
            o.LONGITUDE < bounds.lons.upper &&
            o.LATITUDE > bounds.lats.lower &&
            o.LATITUDE < bounds.lats.upper
        )
    }

    //Dont redraw completely unless we changed tile
    getSnapshotBeforeUpdate(prevProps) {
        let result = { shouldUpdate: false }
        let prevTile = lonLatZoomToZXY(prevProps.radarCenter);
        let curTile = lonLatZoomToZXY(this.props.radarCenter);
        if (prevTile.x !== curTile.x || prevTile.y !== curTile.y)
            return { shouldUpdate: true }
        if (prevProps.shouldDisplayBoats !== this.props.shouldDisplayBoats)
            return { shouldUpdate: true }
        if (!isEqual(prevProps.otherBoats.boats, this.props.otherBoats.boats))
            return { shouldUpdate: true }
        return result;
    }

    clearCanvas() {
        let context = document.getElementById(this.props.id).getContext("2d")
        context.clearRect(0, 0, wh, wh)
    }

    renderIntoCanvas() {
        let img = this.boatIndicatorImg;
        let context = document.getElementById(this.props.id).getContext("2d");
        // eslint-disable-next-line
        this.boatsInBounds().map((b, i) => {
            let zxy = lonLatZoomToZXY({ lat: b.LATITUDE, lon: b.LONGITUDE });
            context.drawImage(img, zxy.xRem * wh, zxy.yRem * wh)
        })
    }

    componentDidUpdate(prevProps, state, snapshot) {
        if (snapshot.shouldUpdate) {
            this.clearCanvas();
            if (this.props.shouldDisplayBoats)
                this.renderIntoCanvas();
        }
    }

    componentDidMount() {
        this.boatIndicatorImg.onload = function () {
            if (this.props.shouldDisplayBoats)
                this.renderIntoCanvas()
        }.bind(this)
        this.boatIndicatorImg.src = boatIndicator_img;
    }

    render() {
        return (
            <div className="boatsoverlay-canvas-container" id="boatcnvcont" style={{ position: "absolute", zIndex: "9" }}>
                <canvas id={this.props.id} height={wh} width={wh} />
            </div>)
    }
}

export default OtherBoatsOverlay
