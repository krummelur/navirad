import React from "react";
import {slide as Menu} from "react-burger-menu";
import "./Menu.css";
import {Link} from "react-router-dom";
import firebaseApp from "../../Util/firebase";

// Source: https://negomi.github.io/react-burger-menu/

export default props => {

    const onSubmit = () => {
        firebaseApp.auth().signOut();
        window.location = "/";
    };

    return (
        <Menu {...props}>

            <Link className="menu-item" to="/about">
                <p>About</p>
            </Link>

            <Link className="menu-item" to="/map">
                <p>Map</p>
            </Link>

            <p className="logout" onClick={onSubmit}>Logout</p>

        </Menu>
    );
};
