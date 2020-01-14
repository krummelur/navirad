import React, {Component} from "react";
import "../Radar/Radar.css";
import SmallMapContainer from "./SmallMapContainer";

class SmallMapBox extends Component {

    render() {
        return (
            <div className="smallmap-container">
                <SmallMapContainer/>
            </div>
        );
    }
}

export default SmallMapBox;