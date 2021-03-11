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
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database"
import "./App.css";
import {saveState, restoreState} from "./helpers/persistentStateHelpers";
import { fetchBoatsAction, stopListeningForBoatsAction } from "./data/actions/otherBoatAction";
import { fetchPlacesAction } from "./data/actions/placesActions";

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
        firebaseApp.auth().onAuthStateChanged(user => {
            //Start subscribing to database when user signs in, stop when they sign out.
            if(user) {
                this.props.store.dispatch(fetchBoatsAction());
                this.props.store.dispatch(fetchPlacesAction());
            } else {
                this.props.store.dispatch(stopListeningForBoatsAction());
            }
        });
        firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
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
