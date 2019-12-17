import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import Map from "../../Components/Map/Map";


class MapView extends Component {
    render() {
        return (
            <div className="MapView">
                <Header />
                <Map />
            </div>
        );
    }
}

export default MapView;
