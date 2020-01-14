import {GoogleApiWrapper, Map} from "google-maps-react";
import React, {Component} from "react";
import * as Constants from "../../data/apiConfig";
import "../Radar/Radar.css"
import {lonLatZoomToZXY, zxyToTileCenter} from '../../helpers/mapHelpers'

const radarCenterToTileCenter = (c) => {
    let center = lonLatZoomToZXY(c);
    return zxyToTileCenter(center);
};

class SmallMap extends Component {
    constructor(props) {
        super(props);
        this.marker = undefined;
    }

    onGoogleMapLoaded(map) {
        this.marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(this.props.radarCenter.lat, this.props.radarCenter.lon),
            map: map,
            title: 'small map'
        });
    }

    //Since the view can be updated very often due to live updating of the  position
    //rerendering on each update is very taxing, especially since the whole map is reinitialized on a 
    //rerender. Instead, only the marker may be updated, freeing up resources.
    shouldComponentUpdate(prevProps) {
        let currentCenter = radarCenterToTileCenter(this.props.radarCenter);
        let prevCenter = radarCenterToTileCenter(prevProps.radarCenter);
        this.marker.setPosition(new window.google.maps.LatLng(this.props.radarCenter.lat, this.props.radarCenter.lon));
        return !(prevCenter.x !== currentCenter.x || prevCenter.y !== currentCenter.y);
    }

    render() {
        let smallMapCenter = radarCenterToTileCenter(this.props.radarCenter);
        return (
            <React.Fragment>
                <Map google={this.props.google}
                     zoom={13}
                     ref={ref => {
                         this.marker || this.onGoogleMapLoaded(ref.map)
                     }}
                     initialCenter={{lat: smallMapCenter.lat, lng: smallMapCenter.lon}}
                     center={{lat: smallMapCenter.lat, lng: smallMapCenter.lon}}
                     style={{width: '512px', height: '512px', overflow: 'hidden'}}
                     disableDefaultUI={true}
                     gestureHandling={'none'}>
                </Map>
            </React.Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(SmallMap);