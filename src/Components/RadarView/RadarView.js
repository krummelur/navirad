import React, { Component } from "react";
import Header from "../Header/Header";
import RadarContainer from "../Radar/RadarContainer";
import RadarMenuContainer from "../RadarMenu/RadarMenuContainer";
import "./RadarView.css";
import Menu from "../Menu/Menu";

class RadarView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"RadarView"} outerContainerId={"outer"}/>

                <div className="RadarView">
                    <Header />
                    <RadarContainer />
                    <RadarMenuContainer />
                </div>
            </div>
        );
    }
}

export default RadarView;
