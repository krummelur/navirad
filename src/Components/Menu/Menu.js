import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Menu.css";
import { Link } from "react-router-dom";
import firebaseApp from "../../Util/firebase";
import { withRouter } from "react-router";

// Source for menu: https://negomi.github.io/react-burger-menu/

const SideMenu = (props) => {

    const onSubmit = () => {
        firebaseApp.auth().signOut();
        setTimeout(() => {
            localStorage.clear();
            props.history.push("/");
        }, 100)
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

export default withRouter(SideMenu);
