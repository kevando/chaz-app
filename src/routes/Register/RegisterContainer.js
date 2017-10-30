
import React, { Component } from 'react';
import { Alert, ListView, View, Button, Text, TextInput, Image } from 'react-native';
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
    console.log('componentWillReceiveProps',nextProps)
    if(this.props.user.isAnonymous == true && nextProps.user.isAnonymous == false) {
      alert('THROW ACTIVATION PARTY')
      // Actions.push('Profile')
    }
  }

  _onLogoutPress = () => {
    // Actions.push('LoggedOut')
    // return
    Alert.alert(
      'Log Out?', null,
      [
        {text: 'No' },
        {text: 'Yes', onPress: () => this.props.signOut(), },
      ]
    )
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
    console.log('RegisterContainer props',this.props)
      return (
        <Register
          onSignInPress={this._onSignInPress}
          updateState={this.updateState}
          onLoginPress={this._onLoginPress}
          {...this.state}
          user={this.props.user}
          app={this.props.app}
          confirmCode={this._onConfirmCode}
          registerAsTest={this.props.registerAsTest}
          loginAsTest={this.props.loginAsTest}
          onLogoutPress={this._onLogoutPress}
        />
      )
  }
}

export default RegisterContainer;
