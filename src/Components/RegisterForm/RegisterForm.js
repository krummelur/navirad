import React, { Component } from 'react';
import {validateRegisterInput} from "../../validateInput";
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
      messages: {},
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
      this.props.toggleFunction();
    }
  }

  isValid() {
    const { messages, isValid } = validateRegisterInput(this.state);
    this.setState({ messages });
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
            <Message usermessage={this.state.messages.userID} />
            <Input
              type="password"
              placeholder="password"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.messages.password} />
            <Input
              type="text"
              placeholder="eMail"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.messages.eMail} />
            <button
              onClick={this.onSubmit.bind(this)}>
              create
            </button>
            <p className="message">
              Already registered?
              <span
                onClick={this.props.toggleFunction}>
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