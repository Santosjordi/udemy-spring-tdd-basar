import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import * as apiCalls from './api/apiCalls';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import authReducer from './redux/authReducer';

const store = createStore(authReducer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
