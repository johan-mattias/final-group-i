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
import addComment from '../img/addButton.png';
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
    review: undefined,
    comments: [],
    addComment: false,
  }

  handleSingOut(e) {
    e.preventDefault();
    //TODO add so we remove the cookie
    this.props.history.push('/');
    console.log("TRY TO SIGN OUT")
  }

  componentWillMount() {
    const review_id = qs.parse(this.props.location.search).review_id;

    let fetchURLreview = `/api/reviews?review_id=${review_id}`;
    fetch( fetchURLreview )
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

    let fetchURLcomment = `/api/comments?review_id=${review_id}`;
    fetch( fetchURLcomment )
      .then((res) => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        console.log(res)
        res.json()
          .then(comments => {
            this.setState({ comments })
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

  // Parses date from 2018-02-19T13:53:04.000Z into 13:53 2018-02-19
  parseTimeStamp(ts) {
    const tsSplit = ts.split("T");

    const date = tsSplit[0].split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];

    const time = tsSplit[1].split(":");
    const hour = time[0];
    const minute = time[1];

    return(year + "-" + month + "-" + day + " " + hour + ":" + minute);
  }

  renderAddComment() {
    const toggleState = this.state.addComment ? false : true;
    this.setState({ addComment: toggleState })
  }

  printReview() {
    const { review, comments } = this.state;

    return(
      <div className="reviewContainer">
        <h2 className="courseName">{review.course_name}</h2>
        <h2 className="teacherName">with {review.first_name} {review.last_name}</h2>
        <hr className="review"/>
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
        <hr className="review"/>
        <h2 className="attributesStyle">Course review: </h2> 
        <p className="reviewText">{review.course_review}</p>
        <h2 className="attributesStyle">Teacher review: </h2> 
        <p className="reviewText">{review.teacher_review}</p>
        <hr className="review"/>
        <div style={{display: "flex"}}>
          <h2 className="attributesStyle">User comments</h2>
          <img onClick={this.renderAddComment.bind(this)} src={addComment} className="addComment" />

          {this.state.addComment ? 
          <p>Add comment here!</p>
          :
          <p>Can't add comment right now</p>
          }
        </div>
        <ul style={{margin: 0, padding: 0, width: "100%"}}>
          {comments.map( c => 
            <li key={c.id} id={c.id} style={{color: 'black', listStyleType: "none"}}>
            <div>
              <p className="commentEmail">{c.email}</p>
              <p className="commentDate"> {this.parseTimeStamp(c.date)} </p>
            </div>
              <p className="reviewText">{c.comment_text}</p>
            </li>
          )}
        </ul>
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