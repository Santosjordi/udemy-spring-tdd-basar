import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import thunk from 'redux-thunk';
import {logger} from "redux-logger";


const configureStore = (addLogger = true) => {
    const middleware = addLogger?
        applyMiddleware(thunk, logger) :
        applyMiddleware(thunk);
    return createStore(authReducer, middleware);
}

export default configureStore;

