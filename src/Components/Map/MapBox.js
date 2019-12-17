import React, { Component } from "react";
import "./Map.css";
import MapEmbedder from "./MapEmbedder";

class MapBox extends Component {

    render() {

        return (
            <div className="map-container">

                <div className="title">Map title</div>

                <div className="mapbox" ref="map">
                    <MapEmbedder/>
                </div>
            </div>
        );
    }
}

export default MapBox;