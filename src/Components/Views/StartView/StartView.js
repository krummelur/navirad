import React, { Component } from 'react';
import LoginForm from "../../Forms/LoginForm";
import RegisterForm from "../../Forms/RegisterForm";
import Header from "../../Header/Header";
import "./StartView.css";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
    }

    togglePage() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        return (
            <div className="StartView">
                <Header/>
                <div className="login-container">
                    <div className="login-text">
                        Welcome to NaviRad, a marine radar simulator.<p />
                        To use this app, you must first login.<br /> If you don't have an account, you can register for free.
                    </div>
                    {this.state.toggle &&
                    <LoginForm
                        toggleFunction={this.togglePage.bind(this)}
                    />}
                    {!this.state.toggle &&
                    <RegisterForm
                        toggleFunction={this.togglePage.bind(this)}
                    />}
                </div>
            </div>
        );
    }
}
export default Start;