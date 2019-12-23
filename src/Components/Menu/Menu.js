import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Menu.css";
import { Link } from "react-router-dom";
import { app } from "../../Util/authenticator";

// Source: https://negomi.github.io/react-burger-menu/

export default props => {
    return (
        <Menu {...props}>

            <Link className="menu-item" to="/about">
                <p>About</p>
            </Link>

            <Link className="menu-item" to="/map">
                <p>Map</p>
            </Link>

            <p onClick={() => app.auth().signOut()}>Logout</p>
        </Menu>
    );
};
