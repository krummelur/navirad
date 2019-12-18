import React, { Component } from 'react';
import Input from "../Input/input";
import Message from "../Message/message";
import validateInput from "../../validateInput";
import { Link } from "react-router-dom";
import "./form.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      password: "",
      login: "",
      eMail: "",
      isValid: true,
      errors: {},
      loginForm: true
    }
  }

  handleLogin(event) {
    event.preventDefault();
    if (this.isValid())
      window.location = "/map";
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
          <form className="login-form">
            <Input
              type="text"
              placeholder="userID"
              sendData={this.getData.bind(this)}
            />
            <Input
              type="password"
              placeholder="password"
              sendData={this.getData.bind(this)}
            />
            <Message usermessage={this.state.errors.login} />
            <Link to="/map">
              <button type="button" link="/map" onClick={this.handleLogin.bind(this)}>login</button>
            </Link>
            <p className="message">Not registered? <span onClick={() => this.props.setStartupToggle(!this.props.toggleStartup)} >Create an account</span></p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;