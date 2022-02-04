import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { UserSignupPage } from './pages/UserSignupPage';
import { LoginPage } from './pages/LoginPage';
import * as apiCalls from './api/apiCalls';

const actions = {
  postLogin: apiCalls.login
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
