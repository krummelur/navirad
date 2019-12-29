import React, { Component } from "react";
import "./AboutView.css";
import About from "../../About/About";
import Navbar from "../../About/Navbar";
import Menu from "../../Menu/Menu";
import Header from "../../Header/Header";

class AboutView extends Component {

    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"AboutView"} outerContainerId={"outer"}/>

                <div className="AboutView">
                    <Header>
                        <Navbar/>
                    </Header>

                    <About />
                </div>
            </div>
        );
    }
}

export default AboutView;
