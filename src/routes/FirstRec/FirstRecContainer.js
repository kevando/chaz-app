  import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Alert} from 'react-native';
import FirstRec from './FirstRec'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
// import Confetti from 'react-native-confetti';

class FirstRecContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      titleInput: '',
      friendInput: '',
      updateState: (state) => this.setState(state),
    }
  }


  _onSaveTitlePress = () => {
    const { initNewRec, user } = this.props
    const { titleInput } = this.state
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      title: titleInput,
    }
    initNewRec(initalRecData)
  }

  _onSaveFriendPress = () => {
    const { addFriend, user, setUnfinishedData } = this.props
    const { friendInput } = this.state

    addFriend({name: friendInput}).then(friend => {
      setUnfinishedData({from: {id: friend.id, name: friend.name}})
    })
  }

  _onNoThanksPress = () => {
    Actions.FirstRecConfirmation()
    // Alert.alert('chaz','You will have another chance to enable this. We strongly encourage it.',
    // [{text:'Okay, Okay', onPress: ()=> Actions.push('FirstRecConfirmation')}])
  }

  _onSetReminderPress = (selectedOption) => {
    Actions.push('FirstRecConfirmation')
    // Alert.alert('Reminder Saved!',`You will receive an app notification in a ${selectedOption}`,
    // [{text:'I want to change it'},{text:'Lets continue', onPress: ()=> Actions.push('FirstRecConfirmation')}])
  }

  render() {

    return (
      <FirstRec
        {...this.state}
        {...this.props}
        onSaveTitlePress={this._onSaveTitlePress}
        onSaveFriendPress={this._onSaveFriendPress}
        onNoThanksPress={this._onNoThanksPress}
        onSetReminderPress={this._onSetReminderPress}
        />
      )
    }
}

export default FirstRecContainer;
