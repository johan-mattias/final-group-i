import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
// import Courses from './Courses';
// import Teachers from './Teachers';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  </main>
)

export default Main
