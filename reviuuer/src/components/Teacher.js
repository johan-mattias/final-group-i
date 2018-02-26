import React from 'react'
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";

import Footer from './Footer';
import '../Style/Portal.css';

class Teacher extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      search: '',
    }
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user')
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
               fetch('/api/teachers')
                .then((res) => {
                  if (res.status !== 200){
                    console.log('Looks like there was a problem. Status Code: ' +
                    res.status);
                    return;
                  }
                  res.json()
                    .then(teachers => this.setState({teachers}));
                })
             }
            else {
              console.log("Wrong cookie ")
              this.props.history.push('/')
            }
          })
        })
    }
    document.body.classList.remove('home');
    document.body.classList.add('portal'); //adding the correct background by setting the class of the body
  }

  searchClick(e){
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  handleClick(e){
     e.preventDefault()
     console.log("HANDLE CLICK")
     // const id = e.target.id;
     // //TODO add so we remove the cookie
     // this.props.history.push(`/portal/review?review_id=${id}`);
   }

  render() {
    let filteredTeachers = this.state.teachers.filter(
      (teacher) => {
        return teacher.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //Add here when we using the last name also.
      }
    );

    return(
      <div className="portal">
        <div className = 'header'>
          <div className="filter-list">
            <form>
                <input className="searchbar" type="text" placeholder="Search..." value={this.state.search || ''} onChange={this.searchClick.bind(this)}/>
            </form>
          </div>
        </div>
        <div className = 'teacherPage'>
          <ul className = 'portalList'>
          {filteredTeachers.map(t =>
           <li onClick={this.handleClick.bind(this)} key={t.id} id={t.id}>
            {t.first_name}
           </li>
          )}
          </ul>
        </div>
        <Footer/>
      </div>

    )
  }
}

export default withRouter(Teacher);