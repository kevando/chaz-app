  import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Alert} from 'react-native';
import FirstRecConfirmation from './FirstRecConfirmation'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


class FirstRecConfirmationContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      titleInput: '',
      friendInput: '',
      updateState: (state) => this.setState(state),
    }
  }
  //
  // _onSaveTitlePress = () => {
  //   const { initNewRec, user } = this.props
  //   const { titleInput } = this.state
  //   const initalRecData = {
  //     to: {uid: user.uid, displayName: user.displayName},
  //     title: titleInput,
  //   }
  //   initNewRec(initalRecData)
  // }
  //
  // _onSaveFriendPress = () => {
  //   const { addFriend, user, setUnfinishedData } = this.props
  //   const { friendInput } = this.state
  //
  //   addFriend({name: friendInput}).then(friend => {
  //     // console.warn(friend)
  //     setUnfinishedData({from: {id: friend.id, name: friend.name}})
  //   })
  // }
  //
  // _onGetStarted = () => {
  //   // Actions.push('FirstRecConfirmation')
  //   // alert('go to first rec')
  //   Actions.push('lightbox')
  //   this.props.setAppData({onboarding: false})
  //
  // }
  //
  // _onNoThanksPress = () => {
  //   Alert.alert('chaz Reminders','You will have another chance to enable this. We strongly encourage it.',
  //   [{text:'Fine, I will do it now'},{text:'Proceed', onPress: ()=> Actions.push('Confirmation')}])
  // }
  //
  // _onSetReminderPress = (selectedOption) => {
  //   Alert.alert('Reminder Saved!',`You will receive an app notification in a ${selectedOption}`,
  //   [{text:'I want to change it'},{text:'Lets continue', onPress: ()=> Actions.push('Confirmation')}])
  // }
  //

  // this works to navigate from onboarding to dashboard
  _onSaveRecPress = () => {
    const { saveRec, setAppData } = this.props;
    saveRec().then(() => {
      Actions.push('lightbox')
      setAppData({onboarding: false})
    })

  }


  render() {

    return (
      <FirstRecConfirmation
        {...this.state}
        {...this.props}
        onSaveRecPress={this._onSaveRecPress}

        />
      )
    }
}

export default FirstRecConfirmationContainer;
