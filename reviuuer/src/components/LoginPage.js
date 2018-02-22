import React from 'react';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import 'typeface-roboto';
import '../Style/Button.css';
import '../Style/App.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  name: '',
                  cookies: '',
                };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  componentWillMount() {
    const { cookies } = this.props;
    document.body.classList.remove('portal');
    document.body.classList.add('home');
  }

  EmailClick(event) {
    this.setState({email: event.target.value});
  }

  PwdClick(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // var email = this.state.email 
    // var pwd = this.state.password
    var email = 'admin@reviuuer.se' // TODO remove this later 
    var pwd = 'admin'  // TODO remove this later 
    var fetchURL = `/api/auth?email=${email}&password=${pwd}`;
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
            const access = json.access
            const token = json.token
            console.log(access)
            console.log(token)
            if (access === true) {
                const cookies = new Cookies();
                const date = new Date();
                const days = 30
                date.setDate(date.getDate() + parseInt(days));
                cookies.set('user', token, {path: '/', expires: date} );
                this.props.history.push('portal');
             }
            else {
              console.log("Wrong username or password")
            }
          })
        })
  }

  render() {
    return (
    <div>
      <div><h1><Link className="link logo" to="/">ReviUUer</Link></h1></div>
      <hr/>
      <div className="flex-container">
        <form className="login-column" onSubmit={this.handleSubmit}>
          <input className="login" placeholder="Email" type="email" value={this.state.email} onChange={this.EmailClick.bind(this)} />
          <input className="login" type="password" placeholder="Password" value={this.state.password} onChange={this.PwdClick.bind(this)} />
          <input className="submit" type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
    );
  };
}


export default withRouter(Login);