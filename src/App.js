import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import MessageBoxContainer from "./Components/MessageBox/MessageBoxContainer";
import StartView from "./Components/Views/StartView/StartView";
import AboutView from "./Components/Views/AboutView/AboutView";
import MapView from "./Components/Views/MapView/MapView";
import RadarView from "./Components/Views/RadarView/RadarView";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import {AuthenticatorProvider} from "./Util/authenticator";
import PrivateRoute from "./Components/PrivateRoute/privateRoute";
import firebaseApp from "./Util/firebase";
import firebase from "firebase";
import "./App.css";
import {saveState, restoreState} from "./helpers/persistentStateHelpers";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        restoreState(this.props.store);

        this.props.store.subscribe(() => {
            saveState(this.props.store.getState())
        });
    }

    componentDidMount() {
        firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    render() {
        return (
            <div className="App">
                <MessageBoxContainer/>
                <AuthenticatorProvider>
                    <Switch>
                        <Route exact path="/" component={StartView}/>
                        <PrivateRoute exact path="/about" component={AboutView}/>
                        <PrivateRoute exact path="/map" component={MapView}/>
                        <PrivateRoute exact path="/radar" component={RadarView}/>
                        <Route path="*" component={PageNotFound}/>
                    </Switch>
                </AuthenticatorProvider>
            </div>
        );
    }
}

export default App;
