import React, { Component } from "react";
import { Link, animateScroll } from "react-scroll";
import "./About.css";
import Header from "../Header/Header";


export default class AboutHeader extends Component {

  componentWillUnmount() {
    animateScroll.scrollToTop();
  }

  render() {
    return (
      <div className="about-header">
          <Header/>
          <ul>
            <li>
              <Link onClick={animateScroll.scrollToTop}>⬆ Back to top ⬆</Link>
            </li>
            <li>
              <Link to="radar" smooth={true} offset={-180} duration={500}>
                Radar
              </Link>
            </li>
            <li>
              <Link to="site" smooth={true} duration={500}>
                Site
              </Link>
            </li>
            <li>
              <Link to="code" smooth={true} duration={500}>
                Code
              </Link>
            </li>
            <li>
              <Link to="team" smooth={true} duration={500}>
                Team
              </Link>
            </li>
          </ul>
      </div>
    );
  }
}
