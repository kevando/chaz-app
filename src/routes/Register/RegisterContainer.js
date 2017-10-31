
import React, { Component } from 'react';
import { Alert, ListView, View, Button, Text, TextInput, Image } from 'react-native';
import Register from './Register';
import { PhoneInput, CodeInput, Confirmation } from './Register';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

class RegisterContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {

      verificationCode: '',
      phoneNumber: '',

      isPhoneVerified: false,
      isPhoneValid: true,
      isCodeConfirmed: false,
      isCodeValid: false,

      verifyingPhone: false,
      verifyingCode: false,

      updateInput: (state) => this._updateInput(state),
      updateState: (state) => this.setState(state),

      fadeOut: false,
      phoneRef: true,
    };


  }
  componentWillReceiveProps({app}) {
    if(app.activeStep !== this.props.app.activeStep) {
      this.setState({activeStep: app.activeStep})
    }
  }


  //
  // _onLogoutPress = () => {
  //   // Actions.push('LoggedOut')
  //   // return
  //   Alert.alert(
  //     'Log Out?', null,
  //     [
  //       {text: 'No' },
  //       {text: 'Yes', onPress: () => this.props.signOut(), },
  //     ]
  //   )
  // }


  _updateInput = ({phoneNumber, verificationCode}) => {
    this.setState({
      phoneNumber: phoneNumber || this.state.phoneNumber,
      verificationCode: verificationCode || this.state.verificationCode,
      isPhoneValid: phoneNumber && phoneNumber.length === 10,
      isCodeValid: verificationCode && verificationCode.length === 6,
    })

  }



  _getCode = () => {
    // this.props.loginAsTest(); return; // FOR TESTING

    const { phoneNumber } = this.state
    const { verifyPhone } = this.props
    // Set loading state
    this.setState({verifyingPhone: true})

    // dispatch redux action
    const successCallback = () => {
      // this.setState({fadeOut: true})
      this.setState({isPhoneVerified: true})
    }
    verifyPhone(phoneNumber,successCallback)

  }

  _confirmCode = () => {
    const { verificationCode } = this.state
    const { confirmCode } = this.props
    // Set loading state
    this.setState({verifyingCode: true})

    // dispatch redux action
    const successCallback = () => {
      // this.setState({fadeOut: true})
      this.setState({isCodeConfirmed: true})
    }
    confirmCode(verificationCode)

  }


  render() {
    console.log('RegisterContainer props',this.state)

    const { app } = this.props
    const { isPhoneVerified, isCodeConfirmed } = this.state

    // if phone is not verified, show phone input

    // once phone is verified show code input

    // once phone and code are verified show conf


    // if(!isPhoneVerified){
    if(app.activeStep == 1 || !app.activeStep) {
      return (
        <PhoneInput getCode={this._getCode} {...this.state} />
      )
    // } else if(isPhoneVerified && !isCodeConfirmed) {
    } else if(app.activeStep == 2) {
      return (
        <CodeInput confirmCode={this._confirmCode} {...this.state} />
      )
    // } else if(isPhoneVerified && isCodeConfirmed) {
    } else if(app.activeStep == 3) {
      return (
        <Confirmation />
      )
    } else {
      console.warn('Some var state error')
      return null
    }

      //
      // return (
      //   <Register
      //     onSignInPress={this._onSignInPress}
      //     updateState={this.updateState}
      //     onLoginPress={this._onLoginPress}
      //     {...this.state}
      //     user={this.props.user}
      //     app={this.props.app}
      //     confirmCode={this._onConfirmCode}
      //     registerAsTest={this.props.registerAsTest}
      //     loginAsTest={this.props.loginAsTest}
      //     onLogoutPress={this._onLogoutPress}
      //   />
      // )
  }

  // render() {
  //   console.log('RegisterContainer props',this.props)
  //     return (
  //       <Register
  //         onSignInPress={this._onSignInPress}
  //         updateState={this.updateState}
  //         onLoginPress={this._onLoginPress}
  //         {...this.state}
  //         user={this.props.user}
  //         app={this.props.app}
  //         confirmCode={this._onConfirmCode}
  //         registerAsTest={this.props.registerAsTest}
  //         loginAsTest={this.props.loginAsTest}
  //         onLogoutPress={this._onLogoutPress}
  //       />
  //     )
  // }
}

export default RegisterContainer;
