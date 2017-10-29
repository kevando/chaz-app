
import React, { Component } from 'react';
import { LayoutAnimation, ListView, View, Button, Text, TextInput, Image } from 'react-native';
import Register from './Register';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

class RegisterContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {
      phoneInput: '',
      error: '',
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
    };

    this.updateState = this.updateState.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.user.isAnonymous) {
      alert('user is logged in and not anon')
    }
  }

  // _createUserCallback() {
  //   console.log('user call back')
  //   Actions.replace('Profile')
  // }

  updateState(state) {
    this.setState(state)
  }

  _onSignInPress = () => {
    const { phoneNumber } = this.state;
    const { signInLink } = this.props
    signInLink(phoneNumber)
  };

  _onConfirmCode = () => {
    const { codeInput } = this.state;
    const { confirmCode } = this.props
    confirmCode(codeInput)
  };



  render() {
      return (
        <Register
          onSignInPress={this._onSignInPress}
          updateState={this.updateState}
          onLoginPress={this._onLoginPress}
          {...this.state}
          user={this.props.user}
          app={this.props.app}
          confirmCode={this._onConfirmCode}
          devLogin={this.props.devLogin}
        />
      )
  }
}

export default RegisterContainer;
