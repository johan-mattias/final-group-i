import React, { Component } from 'react';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";

import config from '../config';

import '../Style/Button.css';
import 'typeface-roboto';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordVerify:'',
                };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.UsernameClick = this.UsernameClick.bind(this);
    this.EmailClick = this.EmailClick.bind(this);
    this.PwdClick = this.PwdClick.bind(this);
    this.PwdClickCheck = this.PwdClickCheck.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    document.body.classList.remove('portal');
    document.body.classList.add('home');
  }

  UsernameClick(event) {
    this.setState({username: event.target.value});
  }

  EmailClick(event) {
    this.setState({email: event.target.value});
  }

  PwdClick(event) {
    this.setState({password: event.target.value});
  }

  PwdClickCheck(event) {
    this.setState({passwordVerify: event.target.value});
  }

  handleSubmit(event) { //TODO LÄGGA IN SÅ VI KOLLAR I DB
    event.preventDefault();
    var pwd1 = this.state.password
    var pwd2 = this.state.passwordVerify

    if (pwd1.length < 4){
      console.log("Password needs to be longer than 4")
    }

    else if (pwd1 !== pwd2){
      console.log("Passwords don't match")
    }

    else{
      fetch(`http://reviuuer.se:3001/api/reg`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
          })
      })
      .then(
        (res) => {
        if(res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            res.status);
          return;
        }
        res.json()
          .then((json) => {
            const added = json.added
            const token = json.token
            console.log(added)
            console.log(token)
            if (added === true) {
                const cookies = new Cookies();
                const date = new Date();
                const days = 30
                date.setDate(date.getDate() + parseInt(days));
                cookies.set('user', token, {path: '/', expires: date} );
                this.props.history.push('portal');
              }
            })
        })
      }
  }


  render() {
    return (
      <div>
        <div><h1 className="logo"><Link className="link logo" to="/">ReviUUer</Link></h1></div>
        <hr/>
        <div className="flex-container">
          <div className="row">
            <form className="login-column" onSubmit={this.handleSubmit}>
              <input className="login" placeholder="Username" value={this.state.username} onChange={this.UsernameClick} />
              <input className="login" placeholder="Email" type="email" value={this.state.email} onChange={this.EmailClick} />
              <input className="login" type="password" placeholder="Password" value={this.state.password} onChange={this.PwdClick} />
              <input className="login" type="password" placeholder="Password" value={this.state.passwordVerify} onChange={this.PwdClickCheck} />
              <input className="submit" type="submit" value="REGISTER" />
            </form>
          </div>
        </div>
      </div>
    );
  };
}


export default Register;