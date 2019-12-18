import React, { Component } from 'react';
import "./LoginForm.css";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password: "",
        }
    }

    handleIDChange(event) {
        event.preventDefault();
        this.setState({
            userID: event.target.value
        });
    }

    handlePasswordChange(event) {
        event.preventDefault();
        this.setState({
            password: event.target.value
        });
    }

    handleLogin(event) {
        event.preventDefault();
    }

    loginToggle(event) {
        event.preventDefault();
        console.log("toggles");
        this.setState({
            userID: "",
            password: "",
            email: "",
            toggle: !this.state.toggle
        });
    }

    render() {

        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="username" autoComplete="on" value={this.state.userID} onChange={this.handleIDChange.bind(this)} />
                        <input type="password" placeholder="password" autoComplete="on" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                        <button type="button" onClick={this.handleLogin.bind(this)}>login</button>
                        <p className="message">Not registered? <span onClick={() => this.props.setStartupToggle(!this.props.toggleStartup)} >Create an account</span></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;