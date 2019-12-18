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
                {this.props.toggleStartup&&<LoginForm />}
                {!this.props.toggleStartup&&<RegisterForm/>}
            </div>
        );
    }
}

export default Start;