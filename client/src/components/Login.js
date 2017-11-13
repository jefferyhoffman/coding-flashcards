import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful.
      signInSuccessUrl: '/dashboard',
      // We will display Google and GitHub as auth providers.
      signInOptions: [
        props.firebase.auth.GithubAuthProvider.PROVIDER_ID,
        props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        props.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
  }

  render() {
    return (
      <div className="Login">
        <FirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={this.props.firebase.auth()}
        />
      </div>
    );
  }
}

export default Login;
