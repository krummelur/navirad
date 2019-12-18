import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import StartContainer from "../../Components/Start/StartContainer";
import "./StartView.css";

class StartView extends Component {
    render() {
        return (
            <div className="StartView">
                <Header/>
                <StartContainer />
            </div>
        );
    }
}

export default StartView;
