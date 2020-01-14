import React, {useContext, useState} from 'react';
import Input from "../Input/input";
import Message from "../Message/message";
import Button from "../Button/Button";
import {validateLoginInput} from "../../Util/validateInput";
import {Redirect} from "react-router";
import {AuthenticatorContext} from "../../Util/authenticator";
import firebaseApp from "../../Util/firebase";
import "./form.css";

const LoginForm = (props) => {

    const [eMail, seteMail] = useState({ID: "", value: ""});
    const [password, setPassword] = useState({ID: "", value: ""});
    const [message, setMessage] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        if (isValid()) {
            firebaseApp.auth().signInWithEmailAndPassword(eMail.value, password.value)
                .catch(error => {
                    setMessage(error.message);
                });
        }
    }

    const isValid = () => {
        const {message, isValid} = validateLoginInput({eMail, password});
        setMessage(message);
        return isValid;
    }

    const {currentUser} = useContext(AuthenticatorContext);

    if (currentUser)
        return <Redirect to="/map"/>;

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <Input
                        type="text"
                        placeholder="eMail"
                        sendData={seteMail}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        sendData={setPassword}
                    />
                    <Message
                        usermessage={message}
                        style={{color: "red"}}
                    />
                    <Button
                        function={handleLogin}
                        title={"login"}
                    />
                    <p
                        className="message">
                        Not registered?
                        <span className="create"
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