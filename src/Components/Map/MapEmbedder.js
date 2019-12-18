import React, { Component } from "react";
import {Map, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";

class MapEmbedder extends Component {

    componentDidMount() {
        //this.props.google.maps.event.addDomListener(window, 'click', (event) => {alert()});
    }

    componentWillUnmount() {
        this.props.google.event.clearInstanceListeners();
    }

    render() {
        if(!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google} zoom={12} initialCenter={{lat:59.440503, lng:18.734038}} disableDoubleClickZoom={true} style={{width: '68%', height: '60%'}}>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (Constants.GOOGLE_API_KEY)
    })(MapEmbedder);
