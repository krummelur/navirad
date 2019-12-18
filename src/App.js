import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "./App.css";
import StartView from "./Views/StartView/StartView";
import AboutView from "./Views/AboutView/AboutView";
import MapView from "./Views/MapView/MapView";
import RadarView from "./Views/RadarView/RadarView";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import {userActions} from "./data/actions/userActions";

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

        storedState.users.forEach(user => {
            this.props.store.dispatch(userActions.addUser(user));
        });
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route
                        exact path="/"
                        component={StartView}
                    />

                    <Route
                        exact path="/about"
                        render={() => <AboutView />}
                    />

                    <Route
                        exact path="/map"
                        render={() => <MapView />}
                    />

                    <Route
                        exact path="/radar"
                        render={() => <RadarView />}
                    />

                    <Route
                        path="*"
                        component={PageNotFound}
                    />
                </Switch>


            </div>
        );
    }
}

export default App;
