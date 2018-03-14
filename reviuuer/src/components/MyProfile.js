import React from 'react'
import Cookies from "universal-cookie";

import Footer from './Footer';
import config from '../config';

import '../Style/Portal.css';

import space_dolphin from "../img/space_dolphin.jpg";

var sectionStyle = {
  width: "100%",
  height: "700px",
  backgroundImage: `url(${space_dolphin})`
}
class MyProfile extends React.Component{
  constructor(props) {
    super(props);

     this.handleSingOut = this.handleSingOut.bind(this);
  }

  state = {
    courses: []
  }

  handleSingOut(e) {
    e.preventDefault();
    const c = new Cookies();
    var cookieFromUser = c.get('user')
    c.remove('user', { path: '/' });
    this.props.history.push('/');
    console.log("TRY TO SIGN OUT")
  }

  componentWillMount() {
    const c = new Cookies();
    var cookieFromUser = c.get('user')

    if(cookieFromUser == undefined){
      console.log("Wrong cookie ")
      this.props.history.push('/')
    }
    var fetchURL = `http://reviuuer.se:3001/api/auth?cookie=${cookieFromUser}`;
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
               fetch(`http://reviuuer.se:3001/api/courses`)
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

  render() {
    console.log(this.state.courses);
    return (
      <section style={ sectionStyle }>
        <div className="portal">
            <div className = "signOutContainer">
              <button className="signOut" onClick={this.handleSingOut}>SIGN OUT</button>
            </div>
          <Footer/>
        </div>
      </section>
    )
  }
}

export default MyProfile