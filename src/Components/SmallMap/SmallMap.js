import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React, { Component } from "react";
import * as Constants from "../../data/apiConfig";
import "../Radar/Radar.css"

class SmallMap extends Component {
    render() {
        return (
            <div>
                <Map google={this.props.google}
                     zoom={13}
                     initialCenter={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}}
                     style={{width: '512px', height: '512px'}}
                     disableDefaultUI={true}
                     gestureHandling={'none'}>
                    <Marker position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }}/>
                </Map>
            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(SmallMap);