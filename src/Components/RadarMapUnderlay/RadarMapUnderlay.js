import { lonLatZoomToZXY } from '../../helpers/mapHelpers'
import React, { useState, useEffect } from "react";

const referenceMapUrl = () => {
    let zxy = lonLatZoomToZXY(this.props.radarCenter)
    return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${zxy.z}/${zxy.x}/${zxy.y}.png`
  }


useEffect = (props) => {
    let img = new Image();
    img.onLoad = () => {
        let cnv = document.getElementById("map-canvas"); 
        cnv.getContext("2d").drawImage(img, 0, 0, cnv.width, cnv.height);
    }
    img.src = referenceMapUrl;
}

function RadarMapUnderlay (props) {
    return(
        <canvas id="map-canvas" width="512" height="512" alt="cnv" 
        /*style={{display: props.shouldDisplayMap ? "" : "none" }}*/
        />
    )
}

export default RadarMapUnderlay;