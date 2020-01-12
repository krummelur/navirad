import React, { Component } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";
import InfoWindowWrapper from "./InfoWindowWrapper";
import { Link } from "react-router-dom";
import { isEqual } from 'lodash';

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        this.mapOptions = this.mapOptions.bind(this);
        this.state = {
            displayMarkerInfo: false,
            isLoadingWaterApi: false
        }
    }

    centerMarker() {
        return <Marker key="Marker" position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }} />
    }

    infoBox() {
        let infoBoxBody = this.state.isLoadingWaterApi ?
            <p> Loading... </p>
            :
            <React.Fragment>
                <p>Open radar view at this position?</p>
                <p>Longitude: {this.props.radarCenter.lon.toFixed(4)}</p>
                <p>Latitude: {this.props.radarCenter.lat.toFixed(4)}</p>
            </React.Fragment>
        return (
            //The InfoWindow will not trigger custom onClick events, hence this wrapper.
            <InfoWindowWrapper
                options={{
                    pixelOffset: new window.google.maps.Size(0, -40)
                }}
                visible={this.state.displayMarkerInfo}
                position={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }}
                onClose={() => { this.setState({ displayMarkerInfo: false }) }}>
                <div>
                    <div className="infowindow-text">
                        {infoBoxBody}
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

    componentDidUpdate(prevProps) {
        //If another component updates the center, we should move there and display info
        if (!isEqual(prevProps.radarCenter, this.props.radarCenter) && !this.state.displayMarkerInfo) {
            this.setState({ displayMarkerInfo: true })
        }
    }

    onWater = (lat, lon) => {
        this.setState({ isLoadingWaterApi: true })
        return fetch("https://api.onwater.io/api/v1/results/" + lat + "," + lon + "?access_token=" + Constants.ONWATER_API_KEY)
            .then(response => response.json())
            .then(response => response.water)
    };

    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <React.Fragment>
                <Map google={this.props.google}
                     className="google-maps-main"
                     zoom={12}
                     initialCenter={{ lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon }}
                     disableDoubleClickZoom={true}
                     disableDefaultUI={true}
                     onReady={this.mapOptions}
                     style={{ width: '90%', height: '75%' }}
                     onClick={(t, map, c) => {
                         this.setState({ isLoadingWaterApi: true, displayMarkerInfo: true });
                         this.props.setRadarCenter({ lon: c.latLng.lng(), lat: c.latLng.lat() })
                         this.onWater(c.latLng.lat(), c.latLng.lng()).then((result) => {
                             //TODO CHECK AND HANDLE ANY API ERRORS!!
                             this.setState({ isLoadingWaterApi: false });
                         })
                     }}>
                    {this.state.displayMarkerInfo && this.centerMarker()}
                    {this.infoBox()}
                </Map>
                <Link to={"/radar"} id="radarLink" />
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(MapEmbedder);
