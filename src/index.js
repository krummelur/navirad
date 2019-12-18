import React from 'react';
import { combineReducers } from "redux";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

function radarCenter(state = { lon: 18, lat: 59 }, action) {
    switch (action.type) {
        case "SET_RADAR_CENTER":
            return action.payload;
        default:
            return state;
    }
}

function radarSettingsReducer(state = {}, action) {
    switch (action.type) {
        case "SET_RADAR_BEAMWIDTH":
            return { ...state, beamwidth: action.payload }
        case "SET_RAIN_INTERFERENCE":
            return {...state, rainInterference: action.payload}
        case "SET_RADAR_INTERFERENCE":
            return {...state, radarInterference: action.payload}
        default:
            return state;
    }
}

const reducer = combineReducers({
    radarCenter: radarCenter,
    radarSettings: radarSettingsReducer
});


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch({
    type: "SET_RADAR_CENTER",
    payload: { lon: 18.5, lat: 59.17 }
});

store.dispatch({
    type: "SET_RAIN_INTERFERENCE",
    payload: true
});

store.dispatch({
    type: "SET_RADAR_INTERFERENCE",
    payload: true
});

store.dispatch({
    type: "SET_RADAR_BEAMWIDTH",
    payload:  3
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App store={store} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


