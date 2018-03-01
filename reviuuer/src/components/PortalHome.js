import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";

import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';
import Teacher from './Teacher.js'

import LikeThumbIcon from '../img/Thumb.png'
import DislikeThumbIcon from '../img/DislikeThumb.png'
import '../Style/Button.css';
import '../Style/Portal.css';
import '../Style/Img.css'
import 'typeface-roboto';

var imgLike;

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

  likeOrDislike(status){
    if(status == "like"){
      imgLike = <img src = {LikeThumbIcon} className = "navIcon likeAndDislikeIcon"></img>
    }  else if(status == "dislike"){
      imgLike = <img src = {DislikeThumbIcon} className = "navIcon likeAndDislikeIcon"></img>
    }
    
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
          <h1 className="headerText">ReviUUer</h1>
        </div>
        <ul className="portalList">
          {this.state.reviews.map( r =>
            <li className="reviueHomeli" onClick={this.handleClick.bind(this)} key={r.id} id={r.id}>
              
              <div className = "liHomeLeftside">
                <div className = "liCourseHome">{r.course_name}</div>
                <div className = "liHomeFooter">
                  <div className = "liQlty"> Quality <br /> 
                    <div className = "liNum"> {r.quality}</div>
                  </div>
                  <div className = "liDiff"> Difficulty <br /> 
                    <div className = "liNum"> {r.difficulty}</div>
                  </div>
                  <div className = "liCred"> Worth Credits <br /> 
                    <div className = "liNum"> {r.worth_credits}</div>
                  </div>
                </div>
              </div>
              <div className = "liHomeRightside">
                <div className = "liRec">Recommended</div>
                <div className = "liLike">{ this.likeOrDislike(r.like_type)} {imgLike}</div>
                <Link to="/portal" className = "courseNavLink" >Click to read more</Link>  
              </div>
              
               
            </li>
          )}
        </ul>
        <Footer/>
      </div>
    );
  };
}

export default withRouter(PortalHome);