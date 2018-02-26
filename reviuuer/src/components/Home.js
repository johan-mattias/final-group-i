import React, { Component } from 'react';
import 'typeface-roboto';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import '../Style/App.css';
import Login from './LoginPage.js';
import Register from './RegisterPage';
import AddReview from './AddReviewPage';
import Splash from './Splash';
import Portal from './Portal';


class Home extends React.Component {
  constructor(props) {
    super(props);
    }


  render() {
    return (
        <Router>
          <div>
              <Route path="/" exact component={ Splash }/>
              <Route path="/portal" exact component={ Portal }/>
              <Route path="/login" exact component={ Login }/>
              <Route path="/register" exact component={ Register }/>
              <Route path="/addreview" exact component={ AddReview }/>
            </div>   
        </Router>
    );
  };
}

export default withRouter(Home);