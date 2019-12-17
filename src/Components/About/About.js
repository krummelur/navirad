import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./Start.css";

class About extends Component {
    render() {
        return (
            <div className="login-container">
                <p className="about-text">Hej</p>
                <p>Name:</p>
                <input type="text" name="name" placeholder="name"/>
                <p>Password:</p>
                <input type="text" name="pwd" placeholder="password"/>
                <Link className="btn" to="/register">
                    <p>Register</p>
                </Link>
            </div>
        );
    }
}

export default About;
