import React from 'react';
import ReactDOM from 'react-dom';
import reducer from "./data/reducers/reducerCombiner";
import {Router} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import MessageBoxTemplateWrapper from './Components/MessageBox/MessageBoxTemplateWrapper';
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history"
import App from './App';
import './index.css';

const store = createStore(reducer, applyMiddleware(thunk));
const alertConfig = {
    position: positions.BOTTOM_CENTER,
    timeout: 3000,
    offset: '30px',
    transition: transitions.FADE
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <AlertProvider template={MessageBoxTemplateWrapper} {...alertConfig}>
                <App store={store}/>
            </AlertProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);


