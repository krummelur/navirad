import React, { Component } from "react";
import "./AboutView.css";
import Header from "../../Components/Header/Header";
import About from "../../Components/About/About";

class AboutView extends Component {
    render() {
        return (
            <div className="AboutView">
                <Header />
                <About />
            </div>
        );
    }
}

export default AboutView;
