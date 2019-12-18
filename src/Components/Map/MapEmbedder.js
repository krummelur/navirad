import React, { Component } from "react";
import {Map, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";

class MapEmbedder extends Component {
        render() {
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
                     console.log(c.latLng.lat());
                     console.log(c.latLng.lng())
                 }}/>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (Constants.GOOGLE_API_KEY)
    })(MapEmbedder);
