import React from 'react';
import ReactDOM from 'react-dom';
import reducer from "./data/reducers/reducerCombiner";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import MessageBoxTemplateWrapper from './Components/MessageBox/MessageBoxTemplateWrapper';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from './App';
import './index.css';

const composer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(reducer, composer(applyMiddleware(thunk)));
const alertConfig = {
    position: positions.BOTTOM_CENTER,
    timeout: 3000,
    offset: '30px',
    transition: transitions.FADE
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AlertProvider template={MessageBoxTemplateWrapper} {...alertConfig}>
                <App store={store}  />
            </AlertProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


