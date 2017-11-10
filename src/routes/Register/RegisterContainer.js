
import React, { Component } from 'react';
import { Alert, ListView, View, Button, Text, TextInput, Image } from 'react-native';
import Register from './Register';
import { PhoneInput, CodeInput, Confirmation } from './Register';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';

class RegisterContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {

      verificationCode: '',
      phoneNumber: '',

      isPhoneVerified: false,
      isPhoneValid: false,
      isCodeConfirmed: false,
      isCodeValid: false,

      verifyingPhone: false,
      verifyingCode: false,

      updateInput: (state) => this._updateInput(state),
      updateState: (state) => this.setState(state),

      fadeOut: false,
      phoneRef: true,
      errorMessage: '',
    };


  }
  componentDidMount(){
    console.log('MOUNT')
    if(this.props.user.phoneNumber) {
      this.setState({phoneNumber: this.props.user.phoneNumber, isPhoneValid: true})
    }
    //
  }
  componentWillReceiveProps({app}) {
    if(app.error !== this.props.app.error) {
      console.warn('set err')
      this.setState({errorMessage: app.error.message})
    }
  }


  _updateInput = ({phoneNumber, verificationCode}) => {

    this.setState({
      phoneNumber: phoneNumber === '' ? '' : phoneNumber === null ? this.state.phoneNumber : phoneNumber,
      verificationCode: verificationCode || this.state.verificationCode,
      isPhoneValid: phoneNumber && phoneNumber !== '' ? phoneNumber.length === 10 : false,
      isCodeValid: verificationCode ? verificationCode.length === 6 : false,
    })

  }



  _getCode = () => {

    const { phoneNumber } = this.state
    const { verifyPhone } = this.props
    // Set loading state
    this.setState({verifyingPhone: true})

    verifyPhone(phoneNumber)

  }

  _confirmCode = () => {
    const { verificationCode } = this.state
    const { confirmCode } = this.props
    // Set loading state
    this.setState({verifyingCode: true})

    confirmCode(verificationCode)

  }


  render() {
    // console.log('RegisterContainer props',this.props)


    const { app, user } = this.props
    const { isPhoneVerified, isCodeConfirmed, errorMessage } = this.state

    let Content = null


    if(!app.isAnon)
        Content =  <Confirmation user={user} />

    else if(app.activeStep == 1 || !app.activeStep) {
      Content = <PhoneInput getCode={this._getCode} {...this.state} {...this.props} />

    } else if(app.activeStep == 2 && app.isAnon) {
      Content = <CodeInput confirmCode={this._confirmCode} resetPhoneNumber={this.props.resetPhoneNumber} app={this.props.app} {...this.state} />

    } else if(app.activeStep == 3 || !app.isAnon) {
      Content =  <Confirmation user={user} />
    }

    // Content =  <Confirmation user={user} />

    return (
      <View style={styles.container}>
        {errorMessage != '' && <Text style={styles.errorText}>{errorMessage}</Text>}
        {Content}
      </View>
    )


  }

}

export default RegisterContainer;
