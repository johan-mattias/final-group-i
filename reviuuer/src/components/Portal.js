import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";

import PortalHome from './PortalHome.js';
import PortalReview from './PortalReview.js';
import Home from './Home.js';
import Course from './Course.js';
import myProfile from './MyProfile.js'
import PortalAddReview from './PortalAddReview.js';
import CourseReviews from './CourseReviews.js';

class Portal extends React.Component {
  constructor(props) {
  super(props);
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user');
    console.log(cookieFromUser);

    if(cookieFromUser == undefined){
      console.log("Wrong cookie ")
      this.props.history.push('/')
    }
    else{
    var fetchURL = `/api/auth?cookie=${cookieFromUser}`;
    fetch( fetchURL )
    .then(
        (res) => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
      res.json()
          .then((json) => {
            const access = json.accessCookie
            console.log(access)
            if (access === true) {
               console.log("correct cookie ")
             }
            else {
              console.log("Wrong cookie ")
              this.props.history.push('/')
            }
          })
        })
      }
  }

  render() {
    return (
        <Router>
          <div>
            <Route path="/" exact component={ Home }/>
            <Route path="/portal" exact component={ PortalHome }/>
            <Route path="/portal/review" exact component={ PortalReview }/>
            <Route path="/portal/course" exact component={ Course }/>
            <Route path="/portal/myprofile" component={ myProfile }/>
            <Route path="/portal/addreview" exact component={ PortalAddReview }/>
            <Route path="/portal/course/:course_id" component={ CourseReviews }/>
          </div>
        </Router>
    );
  };
}

export default withRouter(Portal);