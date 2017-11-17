  import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Alert} from 'react-native';
import FindInvite from './FindInvite'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
// import Confetti from 'react-native-confetti';

class FindInviteContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameInput: '',
      invite: null,
      searched: false,
      updateState: (state) => this.setState(state),
    }
  }

  //
  _onSaveName = () => {
    // @todo Actually Search for invites

    this.setState({searched: true})

  }
  //
  // _onSaveFriendPress = () => {
  //   const { addFriend, user, setUnfinishedData } = this.props
  //   const { friendInput } = this.state
  //
  //   addFriend({name: friendInput}).then(friend => {
  //     setUnfinishedData({from: {id: friend.id, name: friend.name}})
  //   })
  // }
  //
  // _onNoThanksPress = () => {
  //   Actions.FindInviteConfirmation()
  //   // Alert.alert('chaz','You will have another chance to enable this. We strongly encourage it.',
  //   // [{text:'Okay, Okay', onPress: ()=> Actions.push('FindInviteConfirmation')}])
  // }
  //
  // _onSetReminderPress = (selectedOption) => {
  //   Actions.push('FindInviteConfirmation')
  //   // Alert.alert('Reminder Saved!',`You will receive an app notification in a ${selectedOption}`,
  //   // [{text:'I want to change it'},{text:'Lets continue', onPress: ()=> Actions.push('FindInviteConfirmation')}])
  // }

  render() {

    return (
      <FindInvite
        {...this.state}
        {...this.props}
        onSaveName={this._onSaveName}

        />
      )
    }
}

export default FindInviteContainer;
