import React from 'react';
import { withRouter } from 'react-router';

export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.userToken);
    }

    hasAuth(userToken) {
      return userToken !== null;
    }

    checkAuth(userToken) {
      if ( ! this.hasAuth(userToken)) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;

        this.props.router.push(`/login?redirect=${redirect}`);
      }
    }

    render() {
      return this.hasAuth(this.props.userToken)
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}
