import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Keyboard} from 'react-native';
import GetStarted from './GetStarted'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';

class GetStartedContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCard: true,
      showPhoneInput: false,
      phoneInput: '',
      phoneValid: false,
      friendName: '',
      onChangeText: (nameInput) => this.setState({nameInput}),
      // "to.name", "==", name.toLowerCase()
      updateState: (state) => this.setState(state),
      myInvites: null,


    }
  }


  _onYesPress = () => {
    const { user, initNewRec } = this.props
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      category: 'app',
      title: 'chaz',
      walkthrough: true,
    }

      initNewRec(initalRecData)
        .then(r => {
          // console.log('r',r)
          this.setState({showCard: true})
        })

  }

  _onNextPress = () => {
    // Search invites to see if we can find anything by the inviter name
    const { fetchInvites } = this.props
    const { friendName } = this.state

    Keyboard.dismiss()

        // Search for invites
        fetchInvites("from.displayName",friendName)
          .then(myInvites => {
            // console.warn('invites',myInvites)
            this.setState({myInvites})
            // if no invites, ask the user to enter their phone#

          })

  }
  _onSearchForPhonePress = () => {
    Keyboard.dismiss()
    const { fetchInvites, setUserData } = this.props
    const { phoneNumber } = this.state

    setUserData({phoneNumber})
    // Search for invites
    fetchInvites("to.phoneNumber",phoneNumber)
      .then(myInvites => {
        console.warn('invites',myInvites)
        this.setState({myInvites,phoneSearched: true})
        // if no invites, ask the user to enter their phone#
        if(myInvites.length == 0) {
          // just bring user directly to register
          this._goToRegister(phoneNumber)
        }
      })
  }

    _goToRegister = (phoneNumber) => {
    // Excellent, now pull up the real invite
    // and ask them to register
    this.props.setUserData({phoneNumber})
      .then(Actions.push('Register'))
  }

  render() {
    // console.log(this.props.user)
    // const { question, nameSaved } = this.state
    const { user } = this.props

    return (
      <GetStarted
        {...this.state}
        {...this.props}
        onYesPress={this._onYesPress}
        onNextPress={this._onNextPress}
        goToRegister={this._goToRegister}
        onSearchForPhonePress={this._onSearchForPhonePress}
        />
    )
    }

}

export default GetStartedContainer;
