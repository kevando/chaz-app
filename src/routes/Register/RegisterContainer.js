
import React, { Component } from 'react';
import { LayoutAnimation, ListView, View, Button, Text, TextInput, Image } from 'react-native';
import Register from './Register';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

// const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';


class RegisterContainer extends Component {


  constructor(props) {
    super(props);
    // this.unsubscribe = null;
    this.state = {

      phoneInput: '',
      email: '',
      password: '12345678',
      error: '',

      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
      status: '...'
    };

    this.updateState = this.updateState.bind(this)
    this._createUserCallback = this._createUserCallback.bind(this)
  }



  _createUserCallback() {
    console.log('user call back')
    Actions.replace('Profile')
  }
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
    // console.log(this.props)
    // console.log(this.state)
      return (
        <Register
          onSignInPress={this._onSignInPress}
          updateState={this.updateState}
          onLoginPress={this._onLoginPress}
          {...this.state}
          user={this.props.user}
          app={this.props.app}
          confirmCode={this._onConfirmCode}
        />
      )
  }
}

export default RegisterContainer;
