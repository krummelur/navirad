import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Menu.css";
import { Link } from "react-router-dom";
import { firebaseApp } from "../../Util/authenticator";
import { Redirect } from "react-router";

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

                <p onClick={() => {
                    firebaseApp.auth().signOut();
                    window.location = "/"
                    } }>Logout</p>
            
        </Menu>
    );
};
