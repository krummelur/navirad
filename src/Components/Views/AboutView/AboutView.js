import React, { Component } from "react";
import "./AboutView.css";
import About from "../../About/About";
import Navbar from "../../About/Navbar";
import Menu from "../../Menu/Menu";
import Header from "../../Header/Header";
import { animateScroll } from "react-scroll";

class AboutView extends Component {

    componentDidMount() {
        this.view.addEventListener('hashchange', this.scrollToTop);
    }

    componentWillUnmount() {
        this.view.removeEventListener('hashchange', this.scrollToTop)
    }

    scrollToTop = () => {
      animateScroll.scrollToTop();
    };

    render() {
        return (
            <div id="outer">
                <Menu pageWrapId={"AboutView"} outerContainerId={"outer"}/>

                <div className="AboutView" ref={view => this.view = view}>
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
