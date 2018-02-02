import React, { Component } from 'react';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../Style/App.css';
import login from './LoginPage.js'
import splash from './Splash.js'
import FrontPageButton from './FrontPageButton.js'
import frontButton from './frontButton.css'
import SendButton from './SendButton.js'
import reviews from './Reviews.js'
import NavbarButton from './NavbarButton';
import Footer from './Footer';
import SignOutButton from './SignOutButton'

class Home extends React.Component {
    
    state = {
    response: ''
  };
  
    componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    }

    callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);
    return body;
    };

  render() {
    return (
        <Router>
          <div>
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/login">LOGIN</Link></li>
              <li><Link to="/reviews">REVIEWS</Link></li>
            </ul>

            <Link to="/login">
                <SignOutButton>
                     Sign Out
                </SignOutButton>
            </Link>

            <Footer/>
            <Route path="/"  exact component={ splash }/>
            <Route path="/login" exact component={ login }/>
            <Route path="/reviews" exact component={ reviews }/>
            <div class="flex-container">
              <FrontPageButton>Sign in</FrontPageButton> 
              <FrontPageButton>Sign up</FrontPageButton>
              <SendButton>send</SendButton>
            </div>
          </div>
        </Router>
    );
  };
}

export default Home;