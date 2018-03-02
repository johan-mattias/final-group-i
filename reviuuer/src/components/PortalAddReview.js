import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import qs from "query-string";

import Footer from './Footer';
import Home from './Home.js';
import Course from './Course.js';
import SelectCourse from './SelectCourse.js';

import backArrow from '../img/back-arrow.png';
import addComment from '../img/addButton.png';
import thumbGreen from '../img/thumb_green.png';
import thumbRed from '../img/thumb_red.png';

import '../Style/Button.css';
import '../Style/Portal.css';
import '../Style/Img.css';
import '../Style/Review.css';
import 'typeface-roboto';

class PortalAddReview extends React.Component {
  static contextTypes = {
    router: () => null, // replace with PropTypes.object if you use them
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    course_options: [],
    user_id: '1',
    course_id: null,
    teacher_name: '',
    quality: '',
    difficulty: '',
    can_recommend: '',
    worth_credits: '',
    books_req: '',
    percentage_mand: '',
    exam: '',
    course_review: '',
    teacher_review: '',
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleSubmit(event) {
    console.log(this.state);
    fetch('/api/addreview', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...this.state
        })
    })

    event.preventDefault();
  }

  CommentClick(event) {
    this.setState({newComment: event.target.value});
  }

  setupOptions(value, label) {
    return {
      value: value,
      label: label
    };
  }

  fetchCourses() {
    let fetchURL = `/api/courses?all_courses=1`;
    fetch( fetchURL )
      .then((res) => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        res.json()
          .then(courses => {
            let options = this.state.course_options;

            courses.map( c => {
              options.push(this.setupOptions(c.id, c.name));
            })
            this.setState({ course_options: options });
          });
      })
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
        res.json()
          .then(review => {
            const data = review[0]
            this.setState({ review: data })
          });
      })

    this.fetchCourses();

    document.body.classList.remove('home');
    document.body.classList.add('portal'); //adding the correct background by setting the class of the body
  }

  handleGradedScaleClick(rating, cb) {
    cb(rating);
  }

  printGradedScale(rating, cb) {
    let filled = ["", "", "", "", ""];

    for (let i = 0; i < rating; i++) {
      filled[i] = "scaleItemFilled";
    }

    return(
      <div className="gradedScaleBody">
        <div className={"leftScaleItem " + filled[0]} onClick={() => this.handleGradedScaleClick(1, cb)}/>
        <div className={"middleScaleItem " + filled[1]} onClick={() => this.handleGradedScaleClick(2, cb)}/>
        <div className={"middleScaleItem " + filled[2]} onClick={() => this.handleGradedScaleClick(3, cb)}/>
        <div className={"middleScaleItem " + filled[3]} onClick={() => this.handleGradedScaleClick(4, cb)}/>
        <div className={"rightScaleItem " + filled[4]} onClick={() => this.handleGradedScaleClick(5, cb)}/>
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


  cbChangeCourse(course_id, error) {
    this.setState({course_id})
  }



  render() {
    console.log(this.state);

    return (
      <div className="portal">
        <div className='header'>
          <img onClick={this.context.router.history.goBack} src={backArrow} className="backArrow" />
        </div>
        <form className="new-review" onSubmit={this.handleSubmit}>
            {/* <input className="login" placeholder="course_id" value={this.state.course_id} onChange={(event) => this.setState({course_id: event.target.value})} /><br/>
            <input className="login" placeholder="quality" value={this.state.quality} onChange={(event) => this.setState({quality: event.target.value})} /><br/>
            <input className="login" placeholder="difficulty" value={this.state.difficulty} onChange={(event) => this.setState({difficulty: event.target.value})} /><br/>
            <input className="login" placeholder="can_recommend" value={this.state.can_recommend} onChange={(event) => this.setState({can_recommend: event.target.value})} /><br/>
            <input className="login" placeholder="worth_credits" value={this.state.worth_credits} onChange={(event) => this.setState({worth_credits: event.target.value})} /><br/>
            <input className="login" placeholder="books_req" value={this.state.books_req} onChange={(event) => this.setState({books_req: event.target.value})} /><br/>
            <input className="login" placeholder="percentage_mand" value={this.state.percentage_mand} onChange={(event) => this.setState({percentage_mand: event.target.value})} /><br/>
            <input className="login" placeholder="exam" value={this.state.exam} onChange={(event) => this.setState({exam: event.target.value})} /><br/>
            <input className="login" placeholder="course_review" value={this.state.course_review} onChange={(event) => this.setState({course_review: event.target.value})} /><br/>
            <input className="login" placeholder="teacher_review" value={this.state.teacher_review} onChange={(event) => this.setState({teacher_review: event.target.value})} /><br/> */}


            <h2 className="select-text">Select course</h2>
            <SelectCourse value={this.state.course_id} onChangeCB={this.cbChangeCourse.bind(this)} options={this.state.course_options} />
            <h2 className="select-text">Select teacher</h2>
            <input className="teacher-name" placeholder="Write teacher(s) name(s) here..." value={this.state.teacher_name} onChange={(event) => this.setState({teacher_name: event.target.value})} />

            <hr className="review"/>
            <h2 className="attributesStyle">Quality<br/>
            {/* {this.printGradedScale(0, (rating) => { console.log(rating); } )} */}
            {this.printGradedScale(this.state.quality, (rating) => { this.setState({quality: rating}); })}
            </h2>
            <h2 className="attributesStyle">Difficulty<br/>
            {this.printGradedScale(this.state.difficulty, (rating) => { this.setState({difficulty: rating}); })}
            </h2>
            <h2 className="attributesStyle">Worth credits<br/>
            {this.printGradedScale(this.state.worth_credits, (rating) => { this.setState({worth_credits: rating}); })}
            </h2>
            <h2 className="attributesStyle">Percentage mandatory<br/>
            {this.printGradedScale(this.state.percentage_mand, (rating) => { this.setState({percentage_mand: rating}); })}
            </h2>
            <h2 className="attributesStyle">Books required: </h2>
            {0 ? this.printRadio(true) : this.printRadio(false)}
            <h2 className="attributesStyle">Has exam: </h2>
            {0 ? this.printRadio(true) : this.printRadio(false)}
            <h2 className="attributesStyle">Can reccommend: </h2>
            {0 ?
            <img onClick={this.context.router.history.goBack} src={thumbGreen} className="thumb" /> :
            <img onClick={this.context.router.history.goBack} src={thumbRed} className="thumb" />}
            <hr className="review"/>
            <h2 className="attributesStyle">Course review: </h2>
            <textarea cols="40" rows="5" className="text-review" placeholder="Write course review here..." value={this.state.course_review} onChange={(event) => this.setState({course_review: event.target.value})} />

            <h2 className="attributesStyle">Teacher review: </h2>
            <textarea cols="40" rows="5" className="text-review" placeholder="Write teacher review here..." value={this.state.teacher_review} onChange={(event) => this.setState({teacher_review: event.target.value})} />

            <hr className="review"/>

            <input className="submit" type="submit" value="SUBMIT" />
        </form>

        <Footer/>
      </div>
    );
  };
}

export default withRouter(PortalAddReview);