import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";

import Reviews from './Reviews.js';
import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';
import Teacher from './Teacher.js'

import '../Style/Button.css';
import '../Style/Portal.css';
import 'typeface-roboto';

class PortalHome extends React.Component {
  constructor(props) {
    super(props);

     this.handleSingOut = this.handleSingOut.bind(this);
  }

  state = {
    reviews: []
  }

  handleSingOut(e) {
    e.preventDefault();
    //TODO add so we remove the cookie
    this.props.history.push('/');
    console.log("TRY TO SIGN OUT")
  }

  handleClick(e) {
    e.preventDefault();
    const id = e.target.id;
    //TODO add so we remove the cookie
    this.props.history.push(`/portal/review?review_id=${id}`);
    console.log("HANDLE CLICK")
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user');
    console.log(cookieFromUser);

    if(cookieFromUser == undefined){
      console.log("Wrong cookie ")
      this.props.history.push('/')
    } else {
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
                            fetch('/api/reviews')
                .then((res) => {
                  if(res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                      res.status);
                    return;
                  }
                  console.log(res)
                  res.json()
                    .then(reviews => this.setState({ reviews }));
                  })
              } else {
                console.log("Wrong cookie ")
                this.props.history.push('/')
            }
          })
        })
      }
    document.body.classList.remove('home');
    document.body.classList.add('portal'); //adding the correct background by setting the class of the body
  }

  render() {
    return (
      <div className="portal">
        <div className = 'header'>
          <h1>Home</h1>
          <div className = "signOutContainer">
            <button className="signOut" onClick={this.handleSingOut}>SIGN OUT</button>
          </div>
        </div>
        <ul className="reviueHomeul">
          {this.state.reviews.map( r =>
            <li className="reviueHomeli" onClick={this.handleClick.bind(this)} key={r.id} id={r.id}>
              Course: {r.course_name} Quality: {r.quality}/5
            </li>
          )}
        </ul>
        <Footer/>
      </div>
    );
  };
}

export default withRouter(PortalHome);