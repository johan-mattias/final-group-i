import React from 'react'
import Cookies from "universal-cookie";
import {withRouter, NavLink, Link, Router} from "react-router-dom";

import Footer from './Footer';
import '../Style/Portal.css';

class Course extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      search: '',
    }
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user')

    if(cookieFromUser == undefined){
      console.log("Wrong cookie ")
      this.props.history.push('/')
    }
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
            console.log(access)
            if (access === true) {
               console.log("correct cookie ")
               fetch('http://reviuuer.se/:3001/api/courses')
               .then((res) => {
                 if(res.status !== 200){
                  console.log('Looks like there was a problem. Status Code: ' +
                  res.status);
                  return;
                 }
                 res.json()
                  .then(courses => this.setState({courses}));
               })
             }
            else {
              console.log("Wrong cookie ")
              this.props.history.push('/')
            }
          })
        })
    document.body.classList.remove('home');
    document.body.classList.add('portal'); //adding the correct background by setting the class of the body
  }



  setStyle(rating){
    if(rating < 2.5){
      return <div className= "liAvgScore redstyle">{parseFloat(rating, 2).toFixed(2)}</div>;
    } else if( rating > 3.4){
      return <div className= "liAvgScore greenstyle">{parseFloat(rating, 2).toFixed(2)}</div>;
    } else {
      return <div className= "liAvgScore orangestyle">{parseFloat(rating, 2).toFixed(2)}</div>;
    }

  }

  searchClick(e){
    e.preventDefault();
    this.setState({search: e.target.value});
  }

    handleClick(e) {
    e.preventDefault();
    console.log("HANDLE CLICK")
      const id = e.target.id;
      // //TODO add so we remove the cookie
      this.props.history.push(`/portal/course/${id}`);
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
    let filteredCourses = this.state.courses.filter(
      (course) => {
        return course.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div className="portal">
        <div className = 'header'>
        <h1 className="headerText">Courses</h1>
          <div className="filter-list">
            <form>
                <input className="searchbar" type="text" placeholder="Search..." value={this.state.search || ''} onChange={this.searchClick.bind(this)}/>
            </form>
          </div>
        </div>
        <div className='coursePage'>
          <ul className = 'portalList'>
          {filteredCourses.map(c =>
            <li className="reviueHomeli" onClick={this.handleClick.bind(this)} key={c.id} id={c.id}>
            <div className = "liLeftside" id = {c.id}>
              <div className="liCourse" id = {c.id}>{this.subString(c.name)}</div>
              <div className="liTeachForm" id = {c.id}>{c.distance ? "Distance course": "Campus"}</div>
              <div className = "liCourseFooter" id = {c.id}>
                  <div className = "liCred" id = {c.id}> Credits <br />
                    <div className = "liNum" id = {c.id}> {c.credits} </div>
                  </div>
                  <div className = "liPace" id = {c.id}> Pace <br />
                    <div className = "liNum" id = {c.id}> {c.pace_of_study}% </div>
                  </div>
                  <div className = "liSem" id = {c.id}> Semester <br />
                    <div className = "liNum" id = {c.id}></div>
                  </div>
                </div>
            </div>
            <div className = "liRightside" id = {c.id}>
              <div className="liAvgHeader" id = {c.id}> Average score </div>
              {this.setStyle(c.averageRating)}
              <div className = "liRead" id = {c.id}>Click for more info</div>
            </div>
            </li>
          )}
          </ul>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(Course);