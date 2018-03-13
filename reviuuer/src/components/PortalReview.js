import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import qs from "query-string";

import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';

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
    user_email: 0,
    comments: [],
    addComment: false,
    newComment: "",
  }

  handleSingOut(e) {
    e.preventDefault();
    //TODO add so we remove the cookie
    this.props.history.push('/');
    console.log("TRY TO SIGN OUT")
  }

  CommentClick(event) {
    this.setState({newComment: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var email = this.state.user_email
    var comment = this.state.newComment;
    var review_id = qs.parse(this.props.location.search).review_id;

    var fetchURLUser = `http://reviuuer.se/:3001/api/user?email=${email}`;
    fetch( fetchURLUser )
      .then(res => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        res.json()
          .then(data => {
            const user = data[0]

            var fetchURLComment = `http://reviuuer.se/:3001/api/addcomment`
            fetch(fetchURLComment, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: user.id,
                review_id: review_id,
                comment_text: comment
              })
            }).then(() => {
              this.fetchComments()
            })
          })
      })
  }

  fetchComments() {
    const review_id = qs.parse(this.props.location.search).review_id;

    let fetchURLcomment = `http://reviuuer.se/:3001/api/comments?review_id=${review_id}`;
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
            this.setState({
              comments: comments,
              addComment: false,
              newComment: "", })
          });
      })
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user');
    console.log(cookieFromUser);

    if(cookieFromUser == undefined){
      console.log("Wrong cookie ")
      this.props.history.push('/')
    } else {
    var fetchURL = `http://reviuuer.se/:3001/api/auth?cookie=${cookieFromUser}`;
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
          if (access === true) {
            this.fetchComments();

            document.body.classList.remove('home');
            document.body.classList.add('portal'); //adding the correct background by setting the class of the body

            const review_id = qs.parse(this.props.location.search).review_id;

            let fetchURLreview = `http://reviuuer.se/:3001/api/reviews?review_id=${review_id}`;
            fetch( fetchURLreview )
              .then((res) => {
                if(res.status !== 200) {
                  console.log('Looks like there was a problem. Status Code: ' +
                    res.status);
                  return;
                }
                res.json()
                  .then(review => {
                    const data = review[0]
                    this.setState({ review: data, user_email: json.user_email })
                  });
              })
            } else {
              console.log("Wrong cookie ")
              this.props.history.push('/')
          }
        })
      })
    }

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
        <h2 className="teacherName">with {review.teacher_name ? review.teacher_name : "unkown teacher"}</h2>
        <hr className="review"/>
        <h2 className="attributesStyle">Quality<br/> {this.printGradedScale(review.quality)}</h2>
        <h2 className="attributesStyle">Difficulty<br/> {this.printGradedScale(review.difficulty)}</h2>
        <h2 className="attributesStyle">Worth credits<br/> {this.printGradedScale(review.worth_credits)}</h2>
        <h2 className="attributesStyle">Percentage mandatory<br/> {this.printGradedScale(review.percentage_mand)}</h2>
        <h2 className="attributesStyle">Books required: </h2>
        {review.books_req ? this.printRadio(true) : this.printRadio(false)}
        <h2 className="attributesStyle">Has exam: </h2>
        {review.exam ? this.printRadio(true) : this.printRadio(false)}

        {review.can_recommend ?
        <h2 className="attributesStyle">Can recommend: </h2> :
        <h2 className="attributesStyle">Can not recommend: </h2>}
        {review.can_recommend ?
          <img src={thumbGreen} className="thumb" /> :
          <img src={thumbRed} className="thumb" />}
        <hr className="review"/>
        <h2 className="attributesStyle">Course review: </h2>
        <p className="reviewText">{review.course_review}</p>
        <h2 className="attributesStyle">Teacher review: </h2>
        <p className="reviewText">{review.teacher_review}</p>
        <hr className="review"/>
        <div className="user-comments-container margin">
          <h2 className="attributesStyle user-comments">User comments</h2>
          <img onClick={this.renderAddComment.bind(this)} src={addComment} className="addComment" />
        </div>

        {this.state.addComment ?
        <div style={{width: "90%"}}>
          <p style={{margin: "5px 0 0 3px"}}>New comment:</p>
          <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
            <textarea cols="40" rows="5" className="new-comment" placeholder="Write comment here..." value={this.state.newComment} onChange={this.CommentClick.bind(this)} />
            <input className="comment-submit" type="submit" value="SUBMIT" />
          </form>
        </div>
        :
        undefined
          }
        <ul style={{margin: 0, padding: 0, width: "100%"}}>
          {comments.map( c =>
            <li key={c.id} id={c.id} style={{color: 'black', listStyleType: "none"}}>
            <div>
              <p className="commentEmail">{c.username}</p>
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

    return (
      <div className="portal">
        <div className='header'>
          <img onClick={this.context.router.history.goBack} src={backArrow} className="backArrow" />
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