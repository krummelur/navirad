import React, { Component } from "react";
import Header from "../../Header/Header";
import RadarContainer from "../../Radar/RadarContainer";
import SmallMapContainer from "../../SmallMap/SmallMapContainer";
import RadarMenuContainer from "../../RadarMenu/RadarMenuContainer";
import RadarHeaderContainer from "../../RadarHeader/RadarHeader";
import Menu from "../../Menu/Menu";
import "./RadarView.css";

class RadarView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"RadarView"} outerContainerId={"outer"}/>

                <div className="RadarView">
                    <Header />
                    <RadarHeaderContainer/>
                    <div className="radarmap-container">
                        <SmallMapContainer/>
                        <RadarContainer />
                    </div>
                    <RadarMenuContainer />
                </div>
            </div>
        );
    }
}

export default RadarView;
