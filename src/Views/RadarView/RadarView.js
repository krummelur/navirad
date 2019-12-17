import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import RadarContainer from "../../Components/Radar/RadarContainer";
import RadarMenu from "../../Components/RadarMenu/RadarMenu";
import "./RadarView.css";
import Menu from "../../Components/Menu/Menu";

class RadarView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"RadarView"} outerContainerId={"outer"}/>

                <div className="RadarView">
                    <Header />
                    <RadarContainer />
                    <RadarMenu />
                </div>
            </div>
        );
    }
}

export default RadarView;
