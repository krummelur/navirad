import React, { Component } from "react";
import {Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";

class MapEmbedder extends Component {
    centerMarker() {
        if(this.props.radarCenter)
            return (<Marker key="Marker" position={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}} />) 
    }

    render() {
            console.log("THIS IS PROPS")
            console.log(this.props)

        if(!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google}
                 zoom={12}
                 initialCenter={{lat:59.440503, lng:18.734038}}
                 disableDoubleClickZoom={true}
                 gestureHandling={'none'}
                 style={{width: '78.75%', height: '75%'}}
                 onClick={(t, map, c) => {
                    this.props.setRadarCenter({ lon: c.latLng.lng(), lat: c.latLng.lat() })
                 }}>
                {this.centerMarker()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
    })(MapEmbedder);
