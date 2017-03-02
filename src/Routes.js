import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import NotFound from './containers/NotFound';
import requireAuth from './components/AuthenticatedComponent';
import requireUnauth from './components/UnauthenticatedComponent';

export default (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={requireUnauth(Login)} />
      <Route path="signup" component={requireUnauth(Signup)} />
      <Route path="notes/new" component={requireAuth(NewNote)} />
      <Route path="notes/:id" component={requireAuth(Notes)} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
