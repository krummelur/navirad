import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import RadarContainer from "../../Components/Radar/RadarContainer";
import RadarMenu from "../../Components/RadarMenu/RadarMenu";
import "./RadarView.css";

class RadarView extends Component {
    render() {
        return (
            <div className="RadarView">
                <Header />
                <RadarContainer />
                <RadarMenu />
            </div>
        );
    }
}

export default RadarView;
