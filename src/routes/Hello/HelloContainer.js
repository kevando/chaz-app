  import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, AlertIOS, Alert} from 'react-native';
import Hello from './Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


class HelloContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameInput: '',
      showWelcome: false,
      onChangeText: (nameInput) => this.setState({nameInput}),
      question: null,
      // nameInputAnimation: 'fadeIn',
    }
  }

  _logout = () => {
    AlertIOS.alert(
      'Log out?', 'Yes, something went wrong and I want to re-start the onboarding',
      [{text: 'Log Out', onPress: this._signout, },
      {text: 'Cancel'}]
    )
  }
  _signout = () => {
    this.setState({showWelcome: false})
    this.props.signOut()
  }

  _onSaveNamePress = () => {
    // this.setState({nameInputAnimation: 'fadeOut'})
    const { setUserData, fetchInvites, saveDisplayName } = this.props
    const { nameInput } = this.state

    saveDisplayName(nameInput)
    setUserData({displayName: nameInput, nameInput: ''})

  }

  _onGetStarted = () => {
    Actions.push('FirstRec')
    // Actions.push('lightbox')
    // this.props.setAppData({onboarding: false})
  }

  _setInitialFeeling = (feeling) => {
    // Component handled some animations, but not very well

    // Now navigate to the next prompt
    this.props.setUserData({initialFeeling: feeling})
    this.setState({showWelcome: true})
  }


  render() {
    console.log('Hello',this.props)
    return (
      <Hello
        {...this.state}
        {...this.props}
        logout={this._logout}
        onSaveNamePress={this._onSaveNamePress}
        onGetStarted={this._onGetStarted}
        onYesPress={this._onYesPress}
        onFeelingPress={this._setInitialFeeling}
        />
      )
    }
}

export default HelloContainer;
