import React, { Component } from "react";
import "./AboutView.css";
import Header from "../../Components/Header/Header";
import About from "../../Components/About/About";
import Menu from "../../Components/Menu/Menu";

class AboutView extends Component {
    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"AboutView"} outerContainerId={"outer"}/>

                <div className="AboutView">
                    <Header />
                    <About />
                </div>
            </div>
        );
    }
}

export default AboutView;
