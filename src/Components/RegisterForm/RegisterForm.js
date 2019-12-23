import React, { Component } from 'react';
import { validateRegisterInput } from "../../Util/validateInput";
import Input from "../Input/input";
import Message from "../Message/message";
import { app } from "../../Util/authenticator";
import "../LoginForm/form.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      password: "",
      eMail: "",
      error: "",
      messages: {},
      isValid: false
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      app.auth().createUserWithEmailAndPassword(this.state.eMail, this.state.password)
        .catch(error => {
          this.setState({
            error: error.message,
            isValid: false
          })
        }).then(() => {
          if (this.state.isValid) {
            this.props.toggleFunction();
            this.props.registration(
              "Registration was succesful!"
            );
          }
        });
    }
  }

  isValid() {
    const { messages, isValid } = validateRegisterInput(this.state);
    this.setState({ messages, isValid });
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
            <Message
              usermessage={this.state.messages.userID}
              style={{ color: "red" }}
            />
            <Input
              type="password"
              placeholder="password"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.messages.password}
              style={{ color: "red" }}
            />
            <Input
              type="text"
              placeholder="eMail"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.messages.eMail}
              style={{ color: "red" }}
            />
            <Message usermessage={this.state.error}
              style={{ color: "red" }}
            />
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