import React from 'react';
import { withRouter } from 'react-router';

export default function requireUnauth(Component) {

  class UnauthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.userToken);
    }

    hasAuth(userToken) {
      return userToken !== null;
    }

    checkAuth(userToken) {
      if (this.hasAuth(userToken)) {
        this.props.router.push('/');
      }
    }

    render() {
      return ! this.hasAuth(this.props.userToken)
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(UnauthenticatedComponent);
}
