import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';

export default (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
