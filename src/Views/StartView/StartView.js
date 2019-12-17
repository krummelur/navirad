import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import Start from "../../Components/Start/Start";
import "./StartView.css";

class StartView extends Component {
    render() {
        return (
            <div className="StartView">
                <Header/>
                <Start />
            </div>
        );
    }
}

export default StartView;
