import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import Cookies from "universal-cookie";

import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';
import config from '../config';

import backArrow from '../img/back-arrow.png';
import thumbGreen from '../img/thumb_green.png';
import thumbRed from '../img/thumb_red.png';

import '../Style/Button.css';
import '../Style/Portal.css';
import '../Style/Img.css'
import 'typeface-roboto';

class CourseReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "",
      courseID: props.match.params.course_id,
      reviews: []
    }
  }

  handleClick(e) {
    e.preventDefault();
    const id = e.target.id;
    //TODO add so we remove the cookie
    this.props.history.push(`/portal/review?review_id=${id}`);
    console.log("HANDLE CLICK")
  }

  likeOrDislike(status){

    if(status === 1){
      return (thumbGreen)
    }  else if(status === 0){
      return (thumbRed)
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
    var fetchURL = `https://reviuuer.se:3001/api/auth?cookie=${cookieFromUser}`;
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
                fetch(`https://reviuuer.se:3001/api/reviews?course_id=${this.state.courseID}`)
                .then((res) => {
                  if(res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                      res.status);
                    return;
                  }
                  console.log('RESULT');
                  console.log(res)
                  console.log('RESULT');
                  res.json()
                    .then(reviews =>
                      {this.setState({ reviews, headerText:reviews[0].course_name })});
                  }) // TODO: WILL CRASH IF COURSE HAVE NO COMMENTS
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

  subString(string){
    if(string.length > 40){
      let res = (string.substr(0,40) + '...')
      return (res)
    }
    else{
      return string
    }
  }

  render() {
    return (
      <div className="portal">
      <div className='header'>
        <img onClick={()=> {this.props.history.push('/portal/course');} } src={backArrow} className="backArrow" />

        <h1 className="headerText courseReviewHeader">{this.state.headerText}</h1>
        </div>
        <ul className="portalList">
          {this.state.reviews.map( r =>
            <li className="reviueHomeli" onClick={this.handleClick.bind(this)} key={r.id} id={r.id}>

              <div className = "liHomeLeftside" id = {r.id}>
                <div className = "liCourseHome" id = {r.id}>{this.subString(r.course_name)}</div>
                <div className = "liHomeFooter" id = {r.id}>
                  <div className = "liQlty" id = {r.id}> Quality <br />
                    <div className = "liNum" id = {r.id}> {r.quality}</div>
                  </div>
                  <div className = "liDiff" id = {r.id}> Difficulty <br />
                    <div className = "liNum" id = {r.id}> {r.difficulty}</div>
                  </div>
                  <div className = "liCred" id = {r.id}> Worth Credits <br />
                    <div className = "liNum" id = {r.id}> {r.worth_credits}</div>
                  </div>
                </div>
              </div>
              <div className = "liHomeRightside" id = {r.id}>
                <div className = "liRec" id = {r.id}>Recommended</div>
                <div className = "liLike" id = {r.id}><img src = { this.likeOrDislike(r.can_recommend) } className = "navIcon likeAndDislikeIcon"></img></div>
                <div className = "liRead" id = {r.id} >Click to read more</div>
              </div>


            </li>
          )}
        </ul>
      <Footer/>
    </div>

    );
  };
}

export default withRouter(CourseReviews);