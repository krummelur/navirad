import React, { Component } from "react";
import {Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "./Map.css";
import * as Constants from "../../data/apiConfig";

class MapEmbedder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading'
        }
    }

    componentDidMount() {
        this.setState({status: 'loaded'});
    }

    render() {
        let googlemap;
        switch(this.state.status){
            case 'loading':
                googlemap = <div>Loading...</div>;
                break;
            case 'loaded':
                googlemap =<Map google={this.props.google} zoom={12} initialCenter={{lat:59.440503, lng:18.734038}} style={{width: '68%', height: '60%'}}/>;
                break;
            default:
                googlemap = <div>Something went wrong.</div>;
        }
        return (
            googlemap
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (Constants.GOOGLE_API_KEY)
    })(MapEmbedder);
