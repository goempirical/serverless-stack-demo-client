import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
    };
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
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

    return (
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
