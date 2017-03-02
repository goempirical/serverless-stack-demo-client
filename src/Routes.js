import React from 'react';
import { Router, Route } from 'react-router';
import App from './App';

export default (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
  </Router>
);
