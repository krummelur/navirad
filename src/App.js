import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import StartView from "./Components/Views/StartView/StartView";
import AboutView from "./Components/Views/AboutView/AboutView";
import MapView from "./Components/Views/MapView/MapView";
import RadarView from "./Components/Views/RadarView/RadarView";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { AuthenticatorProvider } from "./Util/authenticator";
import PrivateRoute from "./Components/PrivateRoute/privateRoute";
import {firebaseApp} from "./Util/authenticator";
import firebase from "firebase";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        if (localStorage.getItem('NaviRad'))
            this.restoreStateFromDisk();

        this.props.store.subscribe(() => {
            this.saveStateToDisk(this.props.store.getState())
        });
    }

    saveStateToDisk(reduxState) {
        localStorage.setItem("NaviRad", JSON.stringify(reduxState));
    }

    restoreStateFromDisk() {
        let storedState = JSON.parse(localStorage.getItem('NaviRad'));
    }

    componentDidMount(){
        firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION); 
    }

    render() {
        return (
            <div className="App">
                <AuthenticatorProvider>
                    <Switch>
                        <Route exact path="/" component={StartView} />
                        <PrivateRoute exact path="/about" component={AboutView} />
                        <PrivateRoute exact path="/map" component={MapView} />
                        <PrivateRoute exact path="/radar" component={RadarView} />
                        <PrivateRoute path="*" component={PageNotFound} />
                    </Switch>
                </AuthenticatorProvider>
            </div>
        );
    }
}

export default App;
