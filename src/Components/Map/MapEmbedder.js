import React, {Component} from "react";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";
import InfoWindowWrapper from "./InfoWindowWrapper";
import {Link} from "react-router-dom";
import {isEqual} from 'lodash';

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        this.mapOptions = this.mapOptions.bind(this);
        this.state = {
            displayMarkerInfo: false,
            isLoadingWaterApi: false,
            onWater: undefined,
            onWaterApiFault: false
        }
    }

    centerMarker() {
        return <Marker key="Marker" position={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}}/>
    }

    infoBox() {
        let onWaterBody =
            <React.Fragment>
                <div>
                    <p>Open radar view at this position?</p>
                    <p>Longitude: {this.props.radarCenter.lon.toFixed(4)}</p>
                    <p>Latitude: {this.props.radarCenter.lat.toFixed(4)}</p>
                </div>
                <div className="center-aligned-element">
                    <button type="button"
                        //There seems to be an issue with using Links inside Map, and especially InfoWindow components.
                        //This works, but could be made nicer. navigation by dispatch (redux-router) could probably solve it.
                            onClick={() => {
                                document.getElementById("radarLink").click()
                            }}>
                        Go to radar view
                    </button>
                </div>
            </React.Fragment>;

        let onLandBody =
            <React.Fragment>
                <div>
                    <p>You clicked on land.</p>
                    <p>This is a marine radar.</p>
                    <p>It is mounted on a boat.</p>
                </div>
            </React.Fragment>;

        let apiFault =
            <React.Fragment>
                <div>
                    <p>There was a fault when checking your position.</p>
                    <p>If your position is on land, the radar will not</p>
                    <p>function properly.</p>
                    {onWaterBody}
                </div>
            </React.Fragment>;

        let body;
        if (this.state.onWaterApiFault)
            body = apiFault;
        else
            body = this.state.onWater ? onWaterBody : onLandBody;

        let infoBoxBody = this.state.isLoadingWaterApi ?
            <p> Loading... </p>
            :
            <React.Fragment>
                {body}
            </React.Fragment>;

        return (
            //The InfoWindow will not trigger custom onClick events, hence this wrapper.
            <InfoWindowWrapper
                options={{
                    pixelOffset: new window.google.maps.Size(0, -40)
                }}
                visible={this.state.displayMarkerInfo}
                position={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}}
                onClose={() => {
                    this.setState({displayMarkerInfo: false})
                }}>
                <div className="infowindow-text">
                    {infoBoxBody}
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
        if (!isEqual(prevProps.radarCenter, this.props.radarCenter)) {
            this.setState({isLoadingWaterApi: true, displayMarkerInfo: true});
            this.onWater(this.props.radarCenter.lat, this.props.radarCenter.lon).then((result) => {
                //TODO CHECK AND HANDLE ANY API ERRORS!!
                this.setState({isLoadingWaterApi: false});
            })
        }
    }

    handleOnWaterError = (response) => {
        if (!response.ok) {
            console.log(response.status);
            this.setState({onWaterApiFault: true})
        }
        return response;
    };

    /**
     * onWater makes a call to the onWater API to check if the selected position is on water or land.
     *
     * @param lat the latitude of the position to check
     * @param lon the longitude of the position to check
     * @returns boolean, true if the api returns an error
     */
    onWater = (lat, lon) => {
        this.setState({isLoadingWaterApi: true});
        return fetch("https://api.onwater.io/api/v1/results/" + lat + "," + lon + "?access_token=" + Constants.ONWATER_API_KEY)
            .then(this.handleOnWaterError)
            .then(response => response.json())
            .then(response => this.setState({onWater: response.water}))
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
                     initialCenter={{lat: this.props.radarCenter.lat, lng: this.props.radarCenter.lon}}
                     disableDoubleClickZoom={true}
                     disableDefaultUI={true}
                     onReady={this.mapOptions}
                     style={{width: '90%', height: '75%'}}
                     onClick={(t, map, c) => {
                         this.setState({isLoadingWaterApi: true, displayMarkerInfo: true});
                         this.props.setRadarCenter({lon: c.latLng.lng(), lat: c.latLng.lat()})
                         this.onWater(c.latLng.lat(), c.latLng.lng()).then((result) => {
                             this.setState({isLoadingWaterApi: false});
                         })
                     }}>
                    {this.state.displayMarkerInfo && this.centerMarker()}
                    {this.infoBox()}
                </Map>
                <Link to={"/radar"} id="radarLink"/>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Constants.GOOGLE_API_KEY
})(MapEmbedder);
