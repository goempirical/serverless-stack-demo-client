import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import { LinkContainer } from 'react-router-bootstrap';
import config from './config.js';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoadingUserToken: true,
    };
  }

  async componentWillMount() {
    const currentUser = this.getCurrentUser();

    if (currentUser === null) {
      this.setState({isLoadingUserToken: false});
      return;
    }

    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    }
    catch(e) {
      alert(e);
    }

    this.setState({isLoadingUserToken: false});
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
    });
  }

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function(err, session) {
        if (err) {
            reject(err);
            return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  handleLogout = (event) => {
    this.updateUserToken(null);
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

    return ! this.state.isLoadingUserToken
      &&
      (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/">Scratch</IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
              { this.state.userToken
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [ <LinkContainer key="1" to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>,
                    <LinkContainer key="2" to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer> ] }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            { React.cloneElement(this.props.children, childProps) }
          </div>
        </div>
      );
  }
}
