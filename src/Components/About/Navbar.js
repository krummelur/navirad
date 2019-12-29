import React, { Component } from "react";
import { Link } from "react-scroll";
import "./About.css";


class Navbar extends Component {
  render() {
    return (
        <div className="about-header">
          <ul>
            <li>
              <Link to="radar" smooth={true} offset={-100} duration={500}>
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

export default Navbar;
