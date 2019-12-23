import React, { Component } from 'react';
import LoginForm from "../../LoginForm/LoginForm";
import RegisterForm from "../../RegisterForm/RegisterForm";
import Header from "../../Header/Header";
import Message from "../../Message/message";
import "./StartView.css";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            message: "",          
        }
    }

    startViewMessage(message) {
        this.setState({message});
    }

    togglePage() {
        this.setState({
            toggle: !this.state.toggle,
            message: ""
        })
    }

    render() {
        return (
            <div className="StartView">
                <Header />
                <div className="login-container">
                    <div className="login-text">
                        Welcome to NaviRad, a marine radar simulator.<p />
                        To use this app, you must first login.<br /> If you don't have an account, you can register for free.
                    </div>
                    {this.state.toggle &&
                        <LoginForm
                            toggleFunction={this.togglePage.bind(this)}
                            login={this.startViewMessage.bind(this)}
                        />}
                    {!this.state.toggle &&
                        <RegisterForm
                            toggleFunction={this.togglePage.bind(this)}
                            registration={this.startViewMessage.bind(this)}
                        />}
                    <Message
                        usermessage={this.state.message}
                        style={{color: "green"}}
                    />
                </div>
            </div>
        );
    }
}

export default Start;