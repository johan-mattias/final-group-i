import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './Style/App.css';
import 'typeface-roboto';

import Home from './components/Home';
import Splash from './components/Splash';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import PortalReview from './components/PortalReview.js';
import Course from './components/Course.js';
import Teacher from './components/Teacher.js'
import myProfile from './components/MyProfile.js'

import './Style/index.css';


class App extends React.Component {
    constructor(props) {
    super(props);
    }

    render() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={ Splash }/>
                <Route exact path="/login" exact component={ Login }/>
                <Route exact path="/register" exact component={ Register }/>
                <Route exact path='/Portal' component={ Home }/>
                <Route exact path="/portal/review/" exact component={ PortalReview }/>
                <Route exact path="/portal/course/" exact component={ Course }/>
                <Route exact path="/portal/teacher/" exact component={Teacher}/>
                <Route exact path="/portal/myProfile/" exact component={myProfile}/>
            </div>
        </Router>
    )
  }
}


ReactDOM.render(
 <App />,
 document.getElementById('root')
);