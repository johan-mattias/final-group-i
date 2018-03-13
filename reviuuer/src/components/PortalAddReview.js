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
import config from '../config';

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
    user_id: 0,
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

  handleSubmit(event) {
    console.log(this.state);
    fetch(`https://reviuuer.se:3001/api/addreview`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...this.state
        })
    }).then(this.context.router.history.goBack())

    event.preventDefault();
  }

  setupOptions(value, label) {
    return {
      value: value,
      label: label
    };
  }

  fetchCourses() {
    let fetchURL = `https://reviuuer.se:3001/api/courses?all_courses=1`;
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
          console.log("correct cookie ")
          console.log(json);
          console.log("correct cookie ")
          if (access === true) {
            this.fetchCourses();

            document.body.classList.remove('home');
            document.body.classList.add('portal'); //adding the correct background by setting the class of the body


            var fetchURLUser = `https://reviuuer.se:3001/api/user?email=${json.user_email}`;
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

                    this.setState({user_id: user.id})
                  })
              })

            } else {
              console.log("Wrong cookie ")
              this.props.history.push('/')
          }
        })
      })
    }
  }

  handleGradedScaleClick(rating, cb) {
    cb(rating);
  }

  handleRadioClick(cb) {
    cb();
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

  printRadio(bool, cb) {
    if(bool === true) {
      return(
        <div className="radioTrue" onClick={() => this.handleRadioClick(cb)}>
          <div className="radioWhiteBoarder" />
        </div>
      );
    } else {
      return(
        <div className="radioFalse" onClick={() => this.handleRadioClick(cb)}>
          <div className="radioWhiteBoarder" />
        </div>
      );
    }
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
          <h2 className="select-text">Select course</h2>
          <SelectCourse value={this.state.course_id} onChangeCB={this.cbChangeCourse.bind(this)} options={this.state.course_options} />

          <h2 className="select-text">Name of teacher</h2>
          <input className="teacher-name" placeholder="Write teacher(s) name(s) here..." value={this.state.teacher_name} onChange={(event) => this.setState({teacher_name: event.target.value})} />

          <hr className="review"/>

          <h2 className="attributesStyle">Quality?<br/>
            {this.printGradedScale(this.state.quality, (rating) => { this.setState({quality: rating}); })}
          </h2>

          <h2 className="attributesStyle">Difficulty?<br/>
            {this.printGradedScale(this.state.difficulty, (rating) => { this.setState({difficulty: rating}); })}
          </h2>

          <h2 className="attributesStyle">Worth credits?<br/>
            {this.printGradedScale(this.state.worth_credits, (rating) => { this.setState({worth_credits: rating}); })}
          </h2>

          <h2 className="attributesStyle">Percentage mandatory?<br/>
            {this.printGradedScale(this.state.percentage_mand, (rating) => { this.setState({percentage_mand: rating}); })}
          </h2>

          <h2 className="attributesStyle">Books required? </h2>
          <div className="radioSelectContainer">
            <div className="radioSelectItem">
              <p className="radioText">No</p>
              {this.state.books_req === 0
              ? this.printRadio(true, () => { this.setState({books_req: 0}); })
              : this.printRadio(false, () => { this.setState({books_req: 0}); })}
            </div>
            <div className="radioSelectItem">
              <p className="radioText">Yes</p>
              {this.state.books_req === 1
              ? this.printRadio(true, () => { this.setState({books_req: 1}); })
              : this.printRadio(false, () => { this.setState({books_req: 1}); })}
            </div>
          </div>


          <h2 className="attributesStyle">Has exam? </h2>
          <div className="radioSelectContainer">
            <div className="radioSelectItem">
              <p className="radioText">No</p>
              {this.state.exam === 0
              ? this.printRadio(true, () => { this.setState({exam: 0}); })
              : this.printRadio(false, () => { this.setState({exam: 0}); })}
            </div>
            <div className="radioSelectItem">
              <p className="radioText">Yes</p>
              {this.state.exam === 1
              ? this.printRadio(true, () => { this.setState({exam: 1}); })
              : this.printRadio(false, () => { this.setState({exam: 1}); })}
            </div>
          </div>


          <h2 className="attributesStyle">Can recommend? </h2>
          <div className="radioSelectContainer">
            <div className="radioSelectItem">
              <p className="radioText">No</p>
              {this.state.can_recommend === 0
              ? this.printRadio(true, () => { this.setState({can_recommend: 0}); })
              : this.printRadio(false, () => { this.setState({can_recommend: 0}); })}
            </div>
            <div className="radioSelectItem">
              <p className="radioText">Yes</p>
              {this.state.can_recommend === 1
              ? this.printRadio(true, () => { this.setState({can_recommend: 1}); })
              : this.printRadio(false, () => { this.setState({can_recommend: 1}); })}
            </div>
          </div>

          <hr className="review"/>
          <h2 className="attributesStyle">Course review: </h2>
          <textarea cols="40" rows="5" className="text-review" placeholder="Write course review here..." value={this.state.course_review} onChange={(event) => this.setState({course_review: event.target.value})} />

          <h2 className="attributesStyle">Teacher review: </h2>
          <textarea cols="40" rows="5" className="text-review" placeholder="Write teacher review here..." value={this.state.teacher_review} onChange={(event) => this.setState({teacher_review: event.target.value})} />

          <input className="comment-submit" type="submit" value="SUBMIT" />
        </form>

        <Footer/>
      </div>
    );
  };
}

export default withRouter(PortalAddReview);