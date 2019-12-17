import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Menu.css";
import {Link} from "react-router-dom";

export default props => {
    return (
        // Pass on our props
        <Menu {...props}>

            <Link className="menu-item" to="/">
                <p>Home</p>
            </Link>

            <Link className="menu-item" to="/about">
                <p>About</p>
            </Link>

            <Link className="menu-item" to="/map">
                <p>Map</p>
            </Link>

            <Link className="menu-item" to="/logout">
                <p>Logout</p>
            </Link>

        </Menu>
    );
};
