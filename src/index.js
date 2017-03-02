import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { browserHistory } from 'react-router';
import './index.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
