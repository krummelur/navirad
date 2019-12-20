import React, { Component } from "react";
import "./Map.css";
import MapEmbedderContainer from "./MapEmbedderContainer";

class MapBox extends Component {

    render() {
        return (
            <div className="map-container">
                <div className="map-title">Click anywhere to drop a marker where the radar view will be rendered. Click and hold to pan the map.</div>
                <div className="mapbox">
                    <MapEmbedderContainer/>
                </div>
            </div>
        );
    }
}

export default MapBox;