import  "./RadarMapUnderlay.css";
import React, { useMemo } from "react";

const referenceMapUrl = (zxy) => `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${zxy.z}/${zxy.x}/${zxy.y}.png`;

function RadarMapUnderlay(props) {
	//React memorization should allow us to skip renders when props unchanged by reusing the same precalculated element.
	const img = useMemo(() => <img 
	  key="map help"
	  alt=""
	  id="map-underlay"
		src={referenceMapUrl(props.currentTile)} 
		style={{ display: props.shouldDisplayMap ? "" : "none" }} />, 
	  [props.currentTile.x, props.currentTile.y, props.shouldDisplayMap]);
	return img
}

export default RadarMapUnderlay;