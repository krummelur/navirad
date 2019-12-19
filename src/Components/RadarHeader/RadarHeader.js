import React from "react";

function RadarHeader(props){
    console.log("rc: " + props.radarCenter);
    return (
        <div className="radarheader">
            <p>Current position: <span>{props.radarCenter}</span></p>
        </div>
    );
}

export default RadarHeader;
