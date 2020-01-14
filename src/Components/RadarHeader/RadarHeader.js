import React from "react";
import "../Views/RadarView/RadarView.css";
import "./RadarHeader.css";
import {Link} from "react-router-dom";

function RadarHeader(props) {
    return (
        <div>
            <div>
                <Link className="btn" to="/map">
                    <span>⬅ Go back to map</span>
                </Link>
            </div>
            <div>Current position:
                <span> Lat {props.radarCenter.lat.toFixed(6)}, long {props.radarCenter.lon.toFixed(6)}</span>
            </div>
        </div>

    );
}

export default RadarHeader;
