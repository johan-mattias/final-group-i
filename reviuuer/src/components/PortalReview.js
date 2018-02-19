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
import thumbGreen from '../img/thumb_green.png';
import thumbRed from '../img/thumb_red.png';

import '../Style/Button.css';
import '../Style/Portal.css';
import '../Style/Img.css';
import '../Style/Review.css';
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

  printGradedScale(rating) {
    let filled = ["", "", "", "", ""];

    for (let i = 0; i < rating; i++) {
      filled[i] = "scaleItemFilled";
    }

    return(
      <div className="gradedScaleBody">
        <div className={"leftScaleItem " + filled[0]}/>
        <div className={"middleScaleItem " + filled[1]}/>
        <div className={"middleScaleItem " + filled[2]}/>
        <div className={"middleScaleItem " + filled[3]}/>
        <div className={"rightScaleItem " + filled[4]}/>
      </div>
    );
  }

  printRadio(bool) {
    if(bool) {
      return(
        <div className="radioTrue">
          <div className="radioWhiteBoarder" />
        </div>
      );
    } else {
      return(
        <div className="radioFalse">
          <div className="radioWhiteBoarder" />
        </div>
      );
    }
  }

  printReview() {
    const { review } = this.state;

    return(
      <div className="reviewContainer">
        <h2 className="courseName">{review.course_name}</h2>
        <h2 className="teacherName">with {review.first_name} {review.last_name}</h2>
        <hr/>
        <h2 className="attributesStyle">Quality<br/> {this.printGradedScale(review.quality)}</h2>
        <h2 className="attributesStyle">Difficulty<br/> {this.printGradedScale(review.difficulty)}</h2>
        <h2 className="attributesStyle">Worth credits<br/> {this.printGradedScale(review.worth_credits)}</h2>
        <h2 className="attributesStyle">Percentage mandatory<br/> {this.printGradedScale(review.percentage_mand)}</h2>
        <h2 className="attributesStyle">Books required: </h2> 
        {review.books_req ? this.printRadio(true) : this.printRadio(false)}
        <h2 className="attributesStyle">Has exam: </h2> 
        {review.exam ? this.printRadio(true) : this.printRadio(false)}
        <h2 className="attributesStyle">Can reccommend: </h2> 
        {review.can_recommend ? 
        <img onClick={this.context.router.history.goBack} src={thumbGreen} className="thumb" /> : 
        <img onClick={this.context.router.history.goBack} src={thumbRed} className="thumb" />}
        <hr/>
        <h2 className="attributesStyle">Course review: </h2> 
        <p className="reviewText">{review.course_review}</p>
        <h2 className="attributesStyle">Teacher review: </h2> 
        <p className="reviewText">{review.teacher_review}</p>
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