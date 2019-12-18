import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import StartView from "./Views/StartView/StartView";
import AboutView from "./Views/AboutView/AboutView";
import MapView from "./Views/MapView/MapView";
import RadarView from "./Views/RadarView/RadarView";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "NaviRad",
        };
    }
    render() {
        return (
            <div className="App">

                <Route exact path="/" component={StartView}/>

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

            </div>
        );
    }
}

export default App;
