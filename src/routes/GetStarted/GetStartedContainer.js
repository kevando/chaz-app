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
      validPhoneNumber: false,
      friendName: '',
      onTextChange: (state) => this.setState(state),
      // "to.name", "==", name.toLowerCase()
      updateState: (state) => this.setState(state),

      // might pass in invites from HelloContainer
      myInvites: this.props.initialInvites,


    }
  }



  _onYesPress = (from) => {
    const { user, initNewRec } = this.props
    console.log('am i called?')
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      from,
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
    const { fetchInvites, setAppData } = this.props
    const { friendName } = this.state

    Keyboard.dismiss()

        // Search for invites
        fetchInvites("from.displayName",friendName)
          .then(myInvites => {
            // console.log('invites',myInvites)
            this.setState({myInvites})
            setAppData({myInvites}) // so activation page has the invites
            // if no invites, ask the user to enter their phone#

          })

  }

  _onSearchForPhonePress = () => {
    Keyboard.dismiss()
    const { fetchInvites, setUserData, setAppData } = this.props
    const { phoneNumber } = this.state

    setUserData({phoneNumber})
    // Search for invites
    fetchInvites("to.phoneNumber",phoneNumber)
      .then(myInvites => {
        // console.warn('invites',myInvites)
        this.setState({myInvites,phoneSearched: true})
        setAppData({myInvites}) // so activation page has the invites
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
      const { setUserData, saveRec, addFriend, setUnfinishedData } = this.props
      setUserData({phoneNumber})
      addFriend({name:this.state.friendName}).then(friend => {
        setUnfinishedData({from: {id: friend.id, name: friend.name}}).then(() => {
          saveRec()
          // Actions.push('Register')
          Actions.push('RegisterModal') // preventing user from going back to creating duplicate first recs

        }).catch(e => Alert.alert('Error adding friend',e))

      }).catch(e => Alert.alert('Error adding friend',e))
  }
  _onAcceptInvitePress = () => {
    // found the invite by either to.name, from.displayName, or to.phoneNumber
    // Register, but do not create a rec

    const { setUserData, user } = this.props
    const { myInvites } = this.state

    if(!myInvites || myInvites.length == 0){
      alert('SOMETHING BAD HAPPENED NO INVITE TO ACCEPT')
      return
    }

    if(!user.displayName){
      alert('NO DISPOKLA NAME SET')
      return
    }
    // console.warn('ACCPTED')
    setUserData({phoneNumber: myInvites[0].to.phoneNumber})
      .then(()=> Actions.push('Register'))

  }

  render() {
    // console.log('GS',this.props)
    // const { question, nameSaved } = this.state
    const { user } = this.props

    if(!this.props.app.token){
      console.warn(' no fucking app token')
    }

    return (
      <GetStarted
        {...this.state}
        {...this.props}
        onYesPress={this._onYesPress}
        onNextPress={this._onNextPress}
        goToRegister={this._goToRegister}
        onSearchForPhonePress={this._onSearchForPhonePress}
        onAcceptInvitePress={this._onAcceptInvitePress}
        />
    )
    }

}

export default GetStartedContainer;
