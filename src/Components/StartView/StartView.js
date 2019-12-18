import React, { Component } from "react";
import Header from "../Header/Header";
import StartContainer from "../Start/StartContainer";
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
