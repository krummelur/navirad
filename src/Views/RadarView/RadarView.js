import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import RadarContainer from "../../Components/Radar/RadarContainer";
import SmallMapContainer from "../../Components/smallMap/SmallMapContainer";
import RadarMenuContainer from "../../Components/RadarMenu/RadarMenuContainer";
import "./RadarView.css";
import Menu from "../../Components/Menu/Menu";

class RadarView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"RadarView"} outerContainerId={"outer"}/>

                <div className="RadarView">
                    <Header />
                    <div className="previewContainer">
                    <RadarContainer />
                    <SmallMapContainer />
                    </div>
                    <RadarMenuContainer />
                </div>
            </div>
        );
    }
}

export default RadarView;
