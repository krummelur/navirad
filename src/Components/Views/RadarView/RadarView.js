import React, {Component} from "react";
import Header from "../../Header/Header";
import RadarContainer from "../../Radar/RadarContainer";
import RadarMenuContainer from "../../RadarMenu/RadarMenuContainer";
import RadarHeaderContainer from "../../RadarHeader/RadarHeaderContainer";
import SmallMapBox from "../../SmallMap/SmallMapBox";
import Menu from "../../Menu/Menu";
import RadarMapUnderlayContainer from "../../RadarMapUnderlay/RadarMapUnderlayContainer";
import "./RadarView.css";
import OtherBoatsOverlayContainer from "../../OtherBoatsOverlay/OtherBoatsOverlayContainer";
import KeyboardNavigationContainer from "../../KeyboardNavigation/KeyboardNavigationContainer";

class RadarView extends Component {
    render() {
        return (
            <div id="radarouter">
                <Menu pageWrapId={"RadarView"} outerContainerId={"radarouter"}/>

                <div className="RadarView">
                    <Header/>
                    <div className="radar-container">
                        <div className="radarheader">
                            <RadarHeaderContainer/>
                        </div>
                        <div className="radarmap-container">
                            <SmallMapBox/>
                            <div className="canvas-container">
                                <KeyboardNavigationContainer/>
                                <RadarContainer/>
                                <OtherBoatsOverlayContainer/>
                                <RadarMapUnderlayContainer/>

                            </div>
                        </div>
                    </div>

                    <RadarMenuContainer/>
                </div>
            </div>
        );
    }
}

export default RadarView;
