import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import qs from "query-string";

import Reviews from './Reviews.js';
import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';
import Teacher from './Teacher.js';

import backArrow from '../img/back-arrow.png';

import '../Style/Button.css';
import '../Style/Portal.css';
import '../Style/Img.css';
import 'typeface-roboto';

class PortalReview extends React.Component {
  static contextTypes = {
    router: () => null, // replace with PropTypes.object if you use them
  }

  constructor(props) {
    super(props);

     this.handleSingOut = this.handleSingOut.bind(this);
  }

  state = { 
    review: undefined
  }

  handleSingOut(e) {
    e.preventDefault();
    //TODO add so we remove the cookie
    this.props.history.push('/');
    console.log("TRY TO SIGN OUT")
  }

  componentWillMount() {
    const review_id = qs.parse(this.props.location.search).review_id;

    let fetchURL = `/api/reviews?review_id=${review_id}`;
    fetch( fetchURL )
      .then((res) => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        console.log(res)
        res.json()
          .then(review => {
            const data = review[0]
            this.setState({ review: data })
          });
           
      })
    document.body.classList.remove('home');
    document.body.classList.add('portal'); //adding the correct background by setting the class of the body
  }

  printReview() {
    const { review } = this.state;

    return(
      <div>
        <p>Course id: {review.course_id}</p>
        <p>Teacher id: {review.teacher_id}</p>
        <p>Quality: {review.quality}/5</p>
        <p>Difficulty: {review.difficulty}/5</p>
        <p>Worth credits: {review.worth_credit}/5</p>
        <p>Percentage mandatory: {review.percentage_mand}/5</p>
        <p>Books required: {review.can_recommend ? 'yes' : 'no'}</p>
        <p>Has exam: {review.exam ? 'yes' : 'no'}</p>
        <p>Can reccommend: {review.can_recommend ? 'yes' : 'no'}</p>
        <p>Course review: {review.course_review}</p>
        <p>Teacher review: {review.teacher_review}</p>
      </div>
    );
  };

  render() {
    const { review } = this.state;

    console.log(review);
    return (
      <div className="portal">
        <div className='header'>
          <img onClick={this.context.router.history.goBack} src={backArrow} className="backArrow" />
          <div className = "signOutContainer">
            <button className="signOut" onClick={this.handleSingOut}>SIGN OUT</button>
          </div>
        </div>
        <div>
          {review ? this.printReview() : undefined}
        </div>
        <Footer/> 
      </div>
    );
  };
}

export default withRouter(PortalReview);