import React from "react";
import "../Views/RadarView/RadarView.css";

function RadarHeader(props){
    return (
        <div>Current position:
            <span>Lat {props.radarCenter.lat}, long {props.radarCenter.lon}</span>
        </div>
    );
}

export default RadarHeader;
