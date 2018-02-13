import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '../img/homeNavIcon.png'
import CourseIcon from '../img/courseNavIcon.png'
import TeacherIcon from '../img/teachNavIcon.png'
import ProfileIcon from '../img/myProfileNavIcon.png'
import AddIcon from '../img/addReviewNavIcon.png'
import '../Style/Button.css'
import '../Style/Portal.css'
import '../Style/Img.css'

class Footer extends Component{    
  render() {
    return(
      <div className = "footer"> 
        <NavLink to="/portal" exact activeClassName="selected" className = "navLink">
          <button className="nav" ><img src = {HomeIcon} className = "navIcon homeNavIcon"></img><br/>Home</button>
        </NavLink>
        <NavLink to="/portal/Course" exact activeClassName="selected" className = "navLink" >
          <button className="nav" ><img src = {CourseIcon} className = "navIcon courseNavIcon"></img><br/>Courses</button>
        </NavLink>
        <NavLink to="/portal/Teacher" exact activeClassName="selected" className = "navLink" >
          <button className="nav"><img src = {TeacherIcon} className = "navIcon teachNavIcon"></img><br/>Teachers</button>    
        </NavLink>
        <NavLink to="/portal/myProfile" exact activeClassName="selected" className = "navLink" >
          <button className="nav"><img src = {ProfileIcon} className = "navIcon profileNavIcon"></img><br/>My Profile</button>    
        </NavLink>
        <NavLink to="/portal/Review" exact activeClassName="selectedAdd" className = "navLink" >
          <button className="nav add"><img src = {AddIcon} className = "navIcon addNavIcon"></img><br/>Add Review</button>    
        </NavLink>
      </div>
    );
  };
}

export default Footer;