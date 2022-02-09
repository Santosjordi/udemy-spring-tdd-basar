import React from "react";
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import * as apiCalls from '../api/apiCalls';

const actions = {
    postLogin: apiCalls.login
  }
  
function App() {
    return (
        <div>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={(props) => <LoginPage {...props} actions={actions} />} />
                    <Route path="/signup" component={UserSignupPage} />
                    <Route path="/:username" component={UserPage} /> {/** not quite sure, revisit 44. React Router min 8 onwards */}
                </Switch>
            </div>
        </div>
    );
}

export default App;
