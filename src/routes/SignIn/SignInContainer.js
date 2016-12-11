import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
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
      showInput: false,
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

  handleSignIn() {
    const { username, email, password } = this.state;
    Meteor.loginWithPassword(username, username, (err) => {
      if (err) {
        console.log('signin err',err)
        this.handleError(err.reason);
      } else {
        // save auth data locally
        AsyncStorage.setItem('authStatus', 'loggedIn' );
      }
    });
  }

  render() {
    return (
      <SignIn
        updateState={this.setState.bind(this)}
        signIn={this.handleSignIn.bind(this)}
        setUserId={this.props.setUserId}
        {...this.state}
      />
    );
  }
}

export default SignInContainer;
