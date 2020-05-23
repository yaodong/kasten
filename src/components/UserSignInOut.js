import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AuthActions } from '../store/auth';
import { AuthShape } from '../store/shapes';

const UserSignInOut = ({ auth, signOut, signIn }) => {
  return auth.isUser
    ? (
      <button onClick={signOut}>
        Sign Out
      </button>
    ) : (
      <button onClick={signIn}>
        Sign In with Google
      </button>
    )
};

UserSignInOut.propTypes = {
  auth: AuthShape,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

UserSignInOut.defaultProps = {
  auth: {}
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch({ type: AuthActions.SIGN_IN }),
  signOut: () => dispatch({ type: AuthActions.SIGN_OUT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignInOut);
