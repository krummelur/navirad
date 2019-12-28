import React, { Component } from "react";
import "./Map.css";
import MapEmbedderContainer from "./MapEmbedderContainer";

class MapBox extends Component {

    render() {
        return (
            <div className="map-container">
                <div className="map-title">Click drop a marker. Click and hold to pan the map.</div>
                <div className="mapbox">
                    <MapEmbedderContainer/>
                </div>
            </div>
        );
    }
}

export default MapBox;