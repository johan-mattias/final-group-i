import React, { Component } from 'react'
import {ReactDOM, Link} from 'react-router-dom';
import Button from './Portal';
import {withRouter} from "react-router-dom";
import '../Style/App.css';
import 'typeface-roboto';



class Splash extends React.Component {
    constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.body.classList.remove('portal');
    document.body.classList.add('home');
  }

    render() {
    return (
        <div>
          <div><h1 className="logo"><Link className="link logo" to="/">ReviUUer</Link></h1></div>
          <hr></hr>
          <div>
          <div className="flex-container">
            <div className="row">
              <div className="login-column">
               <Link className="link" to="/register"><button className="home">REGISTER</button></Link>
                 <br></br>
                <Link className="link" to="/login"><button className="home">LOGIN</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(Splash);