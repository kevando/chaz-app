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
      myInvites: null,
      onChangeText: (nameInput) => this.setState({nameInput}),
      question: null,
    }
  }
  componentDidMount() {
    if(!this.props.app.isAnon) {
      // Something bad happened to allow this
      // AlertIOS.alert(
      //   'Woah!!!', 'Looks like maybe you reinstalled the app',
      //   this._dialogOptions
      // )
    }
  }

  _dialogOptions = [

      {text: 'Log Out', onPress: () => this.props.signOut(), },
      {text: 'Okayy'},

  ]

  _onSaveNamePress = () => {
    const { setUserData, fetchInvites, saveDisplayName } = this.props
    const { nameInput } = this.state

    saveDisplayName(nameInput)
    setUserData({displayName: nameInput})
      .then(myInvites => {
        // Search for invites
        fetchInvites("to.name",nameInput.toLowerCase())
          .then(myInvites => {
            // console.warn('invites',myInvites)
            this.setState({myInvites})

          }).catch(e => Alert.alert('Error fetching invites',e, this._dialogOptions))

      }).catch(e => Alert.alert('Error saving user data',e, this._dialogOptions))
      // .then(r => console.warn(r))
  }
  _onGetStartedPress = () => {
    this.setState({question: 'Did anyone tell you about chaz?'})

  }
  _onYesPress = () => {
    const { user, initNewRec } = this.props
    const { myInvites } = this.state
    let from = myInvites && myInvites.length > 0 && myInvites[0].from
    console.log('myIn',myInvites)
    console.log(from)
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      from,
      category: 'app',
      title: 'chaz',
      walkthrough: true,
    }
    initNewRec(initalRecData).then(()=> {
      Actions.push('GetStarted',{initialInvites: myInvites.length ? myInvites : null})
    })


  }


  render() {

    return (
      <Hello
        {...this.state}
        {...this.props}
        onSaveNamePress={this._onSaveNamePress}
        onGetStartedPress={this._onGetStartedPress}
        onYesPress={this._onYesPress}
        />
      )
    }
}

export default HelloContainer;
