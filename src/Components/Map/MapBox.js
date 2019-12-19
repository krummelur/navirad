import React, { Component } from "react";
import "./Map.css";
import {Link} from "react-router-dom";
import MapEmbedderContainer from "./MapEmbedderContainer";

class MapBox extends Component {

    render() {
        return (
            <div className="map-container">

                <div className="map-title">Click anywhere to render a radar view</div>
                <div className="temp-button">
                    <Link to="/radar"><p>Temporary link to radar</p></Link>
                </div>

                <div className="mapbox">
                    <MapEmbedderContainer/>
                </div>
            </div>
        );
    }
}

export default MapBox;