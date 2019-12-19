import React, { Component } from "react";
import {Map, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        this.mapOptions = this.mapOptions.bind(this);
    }

    mapOptions(mapProps, map) {
        map.setOptions({
            draggableCursor: "crosshair",
        });
    }

    render() {
        console.log("THIS IS PROPS");
        console.log(this.props);

        if(!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google}
                 zoom={12}
                 initialCenter={{lat:59.440503, lng:18.734038}}
                 disableDoubleClickZoom={true}
                 gestureHandling={'none'}
                 disableDefaultUI={true}
                 onReady={this.mapOptions}
                 style={{width: '78.75%', height: '75%'}}
                 onClick={(t, map, c) => {
                     this.props.setRadarCenter({ lon: c.latLng.lng(), lat: c.latLng.lat() });
                     console.log("Set new Center")
                 }}/>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (Constants.GOOGLE_API_KEY)
})(MapEmbedder);
