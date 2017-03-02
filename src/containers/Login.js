import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { withRouter } from 'react-router';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import LoaderButton from '../components/LoaderButton.js';
import config from '../config.js';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
    };
  }

  querystring(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if ( ! results) { return null; }
    if ( ! results[2]) { return ''; }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const userToken = await this.login(this.state.username, this.state.password);
      const redirect = this.querystring('redirect');

      this.props.updateUserToken(userToken);
      this.props.router.push(redirect === '' || redirect === null
        ? '/'
        : redirect);
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  login(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const authenticationData = {
      Username: username,
      Password: password
    };

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password" />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={ ! this.validateForm() }
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
