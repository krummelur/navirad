import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";
import InfoWindowWrapper from "./InfoWindowWrapper";

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        this.mapOptions = this.mapOptions.bind(this);
        this.latlng = { lon: 18.762034897697504, lat: 59.43893468208873 }
        this.state = {
            displayMarkerInfo: false
        }
    }

    centerMarker() {
        if (this.props.radarCenter)
            return <Marker key="Marker" position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }} />
    }

    infoBox() {
        if (this.props.radarCenter)
            return (<InfoWindowWrapper
                    options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
                    visible={true}
                    position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }}
                    onClose={() => { this.setState({displayMarkerInfo: false})}}>
                    <div>
                        <p>Open radar view at this position?</p>
                        <p>Longitude: {this.props.radarCenter.lon.toFixed(4)}</p>
                        <p>Latitude: {this.props.radarCenter.lat.toFixed(4)}</p>
                        <div className="center-aligned-element">
                            <button type="button" onClick={() => { console.log("should navigate to radarview") }}>Go to radar view</button>
                        </div>
                    </div>
                </InfoWindowWrapper>)
    }

    mapOptions(mapProps, map) {
        map.setOptions({
            draggableCursor: "crosshair",
        });
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    render() {
        //let marker;
        //if(this.props.radarCenter)
        //    marker = <Marker key="Marker" position={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}} />

        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google}
                zoom={12}
                initialCenter={{ lat: 59.440503, lng: 18.734038 }}
                disableDoubleClickZoom={true}
                gestureHandling={'none'}
                disableDefaultUI={true}
                onReady={this.mapOptions}
                style={{ width: '78.75%', height: '75%' }}
                onClick={(t, map, c) => {
                    if(!this.state.displayMarkerInfo) this.setState({displayMarkerInfo: true})
                    this.props.setRadarCenter({ lon: c.latLng.lng(), lat: c.latLng.lat() })
                }}>
                {this.state.displayMarkerInfo && this.centerMarker()}
                {this.state.displayMarkerInfo && this.infoBox()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(MapEmbedder);
