import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React, { Component } from "react";
import * as Constants from "../../data/apiConfig";
import "../Radar/Radar.css"
import { lonLatZoomToZXY, zxyToTileCenter } from '../../helpers/mapHelpers'

class SmallMap extends Component {

    render() {
        let smallMapCenter = lonLatZoomToZXY(this.props.radarCenter)
        smallMapCenter = zxyToTileCenter(smallMapCenter);
        return (
            <div>
                <Map google={this.props.google}
                     zoom={13}
                     initialCenter={{lat: smallMapCenter.lat, lng: smallMapCenter.lon}}
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