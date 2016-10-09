import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import SignIn from './SignIn';

class SignInContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordVisible: false,
      error: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleError(error) {
    this.mounted && this.setState({ error });
  }

  validInput(overrideConfirm) {
    const { email, password, confirmPassword, confirmPasswordVisible } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (!overrideConfirm && confirmPasswordVisible && password !== confirmPassword) {
      this.handleError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }

  handleSignIn() {
    // if (this.validInput(true)) {
      const { username, email, password } = this.state;
      Meteor.loginWithPassword(username, username, (err) => {
        if (err) {
          console.log('signin err',err)
          this.handleError(err.reason);
        }
      });
    // }
  }

  // handleCreateAccount() {
  //   const { email, password, confirmPasswordVisible } = this.state;
  //
  //   if (confirmPasswordVisible && this.validInput()) {
  //     Accounts.createUser({ email, password }, (err) => {
  //       if (err) {
  //         this.handleError(err.reason);
  //       } else {
  //         // hack because react-native-meteor doesn't login right away after sign in
  //         this.handleSignIn();
  //       }
  //     });
  //   } else {
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  //     this.setState({ confirmPasswordVisible: true });
  //   }
  // }
  handleGetStarted() {
    const { username, email, password, confirmPasswordVisible } = this.state;


      Accounts.createUser({ username, password: username }, (err) => {
        if (err) {
          console.log('getstarted err',err)
          this.handleError(err.reason);
          // if there is an error, we are going to assume the user exists
          this.handleSignIn();
        } else {
          // hack because react-native-meteor doesn't login right away after sign in
          this.handleSignIn();
        }
      });

  }

  render() {
    return (
      <SignIn
        updateState={this.setState.bind(this)}
        getStarted={this.handleGetStarted.bind(this)}
        signIn={this.handleSignIn.bind(this)}
        {...this.state}
      />
    );
  }
}

export default SignInContainer;
