import React, { Component } from 'react';
import LoginForm from "../LoginForm/LoginFormContainer";
import RegisterForm from "../RegisterForm/RegisterFormContainer";
import "./Start.css";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-text">
                    Welcome to NaviRad, a marine radar simulator.<p/>
                    To use this app, you must first login.<br/> If you don't have an account, you can register for free.
                </div>
                {this.props.toggleStartup&&<LoginForm />}
                {!this.props.toggleStartup&&<RegisterForm/>}
            </div>
        );
    }
}

export default Start;