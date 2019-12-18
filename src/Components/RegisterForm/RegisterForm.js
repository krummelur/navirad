import React, { Component } from 'react';
import "../LoginForm/LoginForm.css";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password: "",
            eMail: ""
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

    handleEmailChange(event){
        event.preventDefault();
        this.setState({
            eMail: event.target.value
        });
    }

    addUser(event){
        event.preventDefault();

        this.props.addUser({
            userID: this.state.userID,
            password: this.state.password,
            eMail: this.state.eMail
        });
    }

    loginToggle(event){
        event.preventDefault();
        console.log("toggles");
        this.setState({
            userID: "",
            password: "",
            email: "",
            toggle: !this.state.toggle
        }) ;
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="name" autoComplete="on" value={this.state.userID} onChange={this.handleIDChange.bind(this)}/>
                        <input type="password" placeholder="password" autoComplete="on" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                        <input type="text" placeholder="email address" autoComplete="on" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                        <button onClick={this.addUser.bind(this)}>create</button>
                        <p className="message">Already registered? <span  onClick={() => this.props.setStartupToggle(!this.props.toggleStartup)}>Sign In</span></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;