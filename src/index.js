import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import { combinedReducers } from './reducers';
import { combinedMiddleware } from './middlewares'

import * as Redux from 'redux';
import { Provider } from 'react-redux';

const preloadedState = {
  questions: {},
  users: {},
  authedUser: ''
} 

const store = Redux.createStore(
  combinedReducers,
  preloadedState,
  combinedMiddleware,
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
