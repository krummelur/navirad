import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";
import InfoWindowWrapper from "./InfoWindowWrapper";
import { Link } from "react-router-dom";

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        //props.addPlace({name: "test place", lat: 59, lon:18});
        props.fetchPlaces();
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
            return (
                //The InfoWindow will not trigger custom onClick events, hence this wrapper.
                <InfoWindowWrapper
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40)
                    }}
                    visible={true}
                    position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }}
                    onClose={() => { this.setState({ displayMarkerInfo: false }) }}>
                    <div>
                        <div className="infowindow-text">
                            <p>Open radar view at this position?</p>
                            <p>Longitude: {this.props.radarCenter.lon.toFixed(4)}</p>
                            <p>Latitude: {this.props.radarCenter.lat.toFixed(4)}</p>
                        </div>
                        <div className="center-aligned-element">
                            <button type="button"
                                //There seems to be an issue with using Links inside Map, and especially InfoWindow components.
                                //This works, but could be made nicer. navigation by dispatch (redux-router) could probably solve it.
                                onClick={() => { document.getElementById("radarLink").click() }}>
                                Go to radar view</button>
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
        console.log(this.props.places);
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <React.Fragment>
                <Map google={this.props.google}
                    zoom={12}
                    initialCenter={{ lat: 59.440503, lng: 18.734038 }}
                    disableDoubleClickZoom={true}
                    disableDefaultUI={true}
                    onReady={this.mapOptions}
                    style={{ width: '78.75%', height: '75%' }}
                    onClick={(t, map, c) => {
                        if (!this.state.displayMarkerInfo) this.setState({ displayMarkerInfo: true })
                        this.props.setRadarCenter({ lon: c.latLng.lng(), lat: c.latLng.lat() })
                    }}>
                    {this.state.displayMarkerInfo && this.centerMarker()}
                    {this.state.displayMarkerInfo && this.infoBox()}
                </Map>
                <Link to={"/radar"} id="radarLink" />
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(MapEmbedder);
