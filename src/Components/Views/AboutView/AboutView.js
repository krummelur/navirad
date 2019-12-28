import React, { Component } from "react";
import "./AboutView.css";
import About from "../../About/About";
import AboutHeader from "../../About/AboutHeader";
import Menu from "../../Menu/Menu";

class AboutView extends Component {

    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"AboutView"} outerContainerId={"outer"}/>

                <div className="AboutView">
                    <AboutHeader/>
                    <About />
                </div>
            </div>
        );
    }
}

export default AboutView;
