import React, { Component } from "react";
import "./Map.css";
import MapEmbedderContainer from "./MapEmbedderContainer";

class MapBox extends Component {

    render() {
        return (
            <div className="map-container">
                <div className="map-title">Click anywhere to render a radar view</div>
                <div className="mapbox">
                    <MapEmbedderContainer/>
                </div>
            </div>
        );
    }
}

export default MapBox;