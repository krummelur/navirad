import React from 'react';
import ReactDOM from 'react-dom';
import reducer from "./data/reducers/reducerCombiner";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './App';
import './index.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch({
    type: "SET_RADAR_CENTER",
    payload: { lon: 18.5, lat: 59.17 }
});

store.dispatch({
    type: "SET_RAIN_INTERFERENCE",
    payload: false
});

store.dispatch({
    type: "SET_RADAR_INTERFERENCE",
    payload: false
});

store.dispatch({
    type: "SET_RADAR_BEAMWIDTH",
    payload: 3
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App store={store} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


