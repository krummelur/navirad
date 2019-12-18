import React, { Component } from "react";
import "./Map.css";
import MapEmbedder from "./MapEmbedder";
import {Link} from "react-router-dom";

class MapBox extends Component {

    render() {

        return (
            <div className="map-container">

                <div className="title">Map title</div>
                <div className="temp-button">
                    <Link to="/radar"><p>Temporary link to radar</p></Link>
                </div>

                <div className="mapbox" ref="map">
                    <MapEmbedder/>
                </div>
            </div>
        );
    }
}

export default MapBox;