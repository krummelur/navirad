import React from "react";
<<<<<<< HEAD
import { slide as Menu } from "react-burger-menu";
import "./Menu.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
=======
import {slide as Menu} from "react-burger-menu";
import "./Menu.css";
import {Link} from "react-router-dom";
>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
import firebaseApp from "../../Util/firebase";

// Source: https://negomi.github.io/react-burger-menu/

const SideMenu = (props) => {

    const onSubmit = () => {
        firebaseApp.auth().signOut();
        window.location = "/";
<<<<<<< HEAD
    }
    
=======
    };

>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
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

export default SideMenu;
