import React, { Component } from 'react';
import validateInput from "../../validateInput";
import Input from "../Input/input";
import Message from "../Message/message";
import "../LoginForm/form.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      password: "",
      eMail: "",
      errors: {},
      isValid: true
    }
  }

  addUser() {
    this.props.addUser({
      userID: this.state.userID,
      password: this.state.password,
      eMail: this.state.eMail
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.addUser();
      this.props.setStartupToggle(!this.props.toggleStartup);
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    this.setState({ errors, isValid });
    return isValid;
  }

  getData(data) {
    this.setState({
      [data.ID]: data.value
    });
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form">
            <Input
              type="text"
              placeholder="userID"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.errors.userID} />
            <Input
              type="password"
              placeholder="password"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.errors.password} />
            <Input
              type="text"
              placeholder="eMail"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.errors.eMail} />
            <button
              onClick={this.onSubmit.bind(this)}>
              create
            </button>
            <p className="message">
              Already registered?
              <span
                onClick={() => this.props.setStartupToggle(!this.props.toggleStartup)}>
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;