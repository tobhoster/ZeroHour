import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginState } from '../actions/sessionsActions';

export function requireAuthenication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.loggedIn) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(loginState(`/${redirectAfterLogin}`));
      }
    }

    render() {
      const { loggedIn } = this.props;

      return (
        <div>
          {loggedIn === true ? (
            <Component {...this.props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: this.props.location }
              }}
            />
          )}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    loggedIn: state.userProfile.loggedIn
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
