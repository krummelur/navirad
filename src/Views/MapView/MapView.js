import React, { Component } from "react";
import "./MapView.css";
import Header from "../../Components/Header/Header";
import MapBox from "../../Components/Map/MapBox";
import Menu from "../../Components/Menu/Menu";


class MapView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"MapView"} outerContainerId={"outer"}/>

                <div className="MapView">
                    <Header />
                    <MapBox />
                </div>
            </div>
        );
    }
}

export default MapView;
