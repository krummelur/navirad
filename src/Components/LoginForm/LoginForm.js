import React, { useContext, useState } from 'react';
import Input from "../Input/input";
import Message from "../Message/message";
import { validateLoginInput } from "../../Util/validateInput";
import { Redirect } from "react-router";
import { AuthenticatorContext } from "../../Util/authenticator";
import {app} from "../../Util/authenticator";
import firebase from "firebase";
import "./form.css";

const LoginForm = (props) => {

  const [userID, setUserID] = useState({ ID: "", value: "" });
  const [password, setPassword] = useState({ ID: "", value: "" });
  const [message, setMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValid()) {
      app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          app.auth().signInWithEmailAndPassword(userID.value, password.value);
        })
        .catch(error => {
          setMessage(error.message);
        })
    }
  }

  const isValid = () => {
    const { message, isValid } = validateLoginInput({ userID, password });
    setMessage(message);
    return isValid;
  }

  const { currentUser } = useContext(AuthenticatorContext);

  if (currentUser)
    return <Redirect to="/map" />;

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <Input
            type="text"
            placeholder="userID"
            sendData={setUserID}
          />
          <Input
            type="password"
            placeholder="password"
            sendData={setPassword}
          />
          <Message
            usermessage={message}
            style={{ color: "red" }}
          />
          <button
            onClick={handleLogin}>
            login
              </button>
          <p
            className="message">
            Not registered?
                <span
              onClick={props.toggleFunction}>
              Create an account
                </span>
          </p>
        </form>
      </div>
    </div>
  );

}

export default LoginForm;