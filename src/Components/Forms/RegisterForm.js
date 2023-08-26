import React, {Component} from 'react';
import {validateRegisterInput} from "../../Util/validateInput";
import Input from "../Input/input";
import Message from "../Message/message";
import Button from "../Button/Button";
import firebaseApp from "../../Util/firebase";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import "./form.css";
import { getDatabase, ref, set } from 'firebase/database';

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

            createUserWithEmailAndPassword(getAuth(), this.state.eMail, this.state.password)
                .catch(error => {
                    this.setState({
                        error: error.message,
                        isValid: false
                    })
                }).then((object) => {
                if (this.state.isValid) {
                    const db = getDatabase();
                    set(ref(db, "/users/" + object.user.uid), {
                        userID: this.state.userID,
                        eMail: this.state.eMail
                    }).then(this.props.toggleFunction())
                        .catch(console.error);
                }
            });
        }
    }

    isValid() {
        const {messages, isValid} = validateRegisterInput(this.state);
        this.setState({messages, isValid});
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
                            placeholder="eMail"
                            sendData={this.getData.bind(this)}
                        />
                        <Message
                            usermessage={this.state.messages.eMail}
                            style={{color: "red"}}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            sendData={this.getData.bind(this)}
                        />
                        <Message usermessage={this.state.messages.password}
                                 style={{color: "red"}}
                        />
                        <Input
                            type="text"
                            placeholder="userID"
                            sendData={this.getData.bind(this)}
                        />
                        <Message usermessage={this.state.messages.userID}
                                 style={{color: "red"}}
                        />
                        <Message usermessage={this.state.error}
                                 style={{color: "red"}}
                        />
                        <Button
                            function={this.onSubmit.bind(this)}
                            title={"create"}
                        />
                        <p className="message">
                            Already registered?
                            <span className="signin"
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