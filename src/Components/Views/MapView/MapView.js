import React, { Component } from "react";
import "./MapView.css";
import Header from "../../Header/Header";
import MapBox from "../../Map/MapBox";
import Menu from "../../Menu/Menu";
import MapMenuContainer from "../../MapMenu/MapMenuContainer";

class MapView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"MapView"} outerContainerId={"outer"}/>
                <div className="MapView">
                    <Header/>
                    <MapBox/>
                    <MapMenuContainer/>
                </div>
            </div>
        );
    }
}

export default MapView;
