import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash'
// import moment from 'moment'

import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather'

import styles from './styles';
import { colors } from '../../config/styles';
import { Button } from '../../components/Generic';
import EnableNotifications from '../../components/EnableNotifications';


// --------------------------------------------------
//    NAME
// --------------------------------------------------

export const Name = (props) => {

  return (
    <Animatable.View style={styles.greetingContainer} >
      <Text style={styles.greetingText} onPress={props.logout}>{props.user.displayName},</Text>
    </Animatable.View>
    );
}

// --------------------------------------------------
//    INPUT TITLE
// --------------------------------------------------

export class TitleInput extends Component {

  _onPress = (feeling) => {
    this.refs[feeling.name].fadeOutUp()
      .then(()=> this.refs.CONTAINER.fadeOut().then(() => this.props.onFeelingPress(feeling)))
  }

  render() {

    if(this.props.unfinished.title) return null;


    return (
      <Animatable.View style={styles.feelingQuestionContainer} ref="CONTAINER" >
        <Text style={styles.feelingQuestionText}>What is the last thing someone recommended?</Text>

        {!this.props.unfinished.title ?
        <TextInput
          onChangeText={(text)=>this.props.updateState({titleInput: text})}
          placeholder=''
          value={this.props.inputTitle}
          autoCorrect={false}
          style={[styles.inputTitle,{borderBottomColor: 'rgba(255,255,255,0.4)',color: 'rgba(255,255,255,0.6)'}]}
          caretHidden={false}
          selectionColor={'rgba(255,255,255,0.4)'}
        /> :
        <Text style={[styles.inputTitle,{}]}>{this.props.unfinished.title}</Text>
      }

        <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">

        </Animatable.View>
      </Animatable.View>
      );
  }

}


// --------------------------------------------------
//    ADD FRIEND
// --------------------------------------------------

export class FriendInput extends Component {

  // _onPress = (feeling) => {
  //   this.refs[feeling.name].fadeOutUp()
  //     .then(()=> this.refs.CONTAINER.fadeOut().then(() => this.props.onFeelingPress(feeling)))
  // }

  render() {
    // console.warn(this.props.unfinished.from)
    if(this.props.unfinished.from) return null;


    return (
      <Animatable.View style={styles.feelingQuestionContainer} ref="CONTAINER" >
        <Text style={styles.feelingQuestionText}>Who recommended?</Text>
        <Text style={[styles.titleText,{}]}>{this.props.unfinished.title}</Text>
        {!this.props.unfinished.from ?
        <TextInput
          onChangeText={(text)=>this.props.updateState({friendInput: text})}
          placeholder=''
          value={this.props.friendInput}
          autoCorrect={false}
          style={[styles.inputFriend,{borderBottomColor: 'rgba(255,255,255,0.4)',color: 'rgba(255,255,255,0.6)'}]}
          caretHidden={false}
          selectionColor={'rgba(255,255,255,0.4)'}
        /> :
        <Text style={[styles.inputTitle,{}]}>{this.props.unfinished.title}</Text>
      }

        <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">

        </Animatable.View>
      </Animatable.View>
      );
  }

}

// --------------------------------------------------
//    SELECT A CATEGORY
//    skipping for now
// --------------------------------------------------

export const CategoryInput = (props) => {
  return null

}


// --------------------------------------------------
//    SET REMINDER
// --------------------------------------------------

export class SetReminder extends Component {

  state = { selectedOption: 'day' }

  _onOptionPress = (option) => {
    this.setState({selectedOption: option})
    this.refs[option].swing().then(()=> {

      // this.setState({selectedOption: option})
    })

  }

  render() {
  // return null

  const { unfinished, notificationPermission, onSetReminderPress } = this.props
  const { selectedOption } = this.state
  // console.warn(selectedOption)
  if(unfinished.from){
    return (
      <Animatable.View animation="fadeIn" style={styles.welcomeContainer} >

      <Text style={styles.timerClockEmoji}>⏲️</Text>
      <Text style={[styles.feelingQuestionText,{}]}>Would you like a reminder?</Text>

      {
        notificationPermission == 'authorized' &&

        <Animatable.View animation="fadeIn" style={styles.reminderOptionsContainer} >

          <TouchableOpacity activeOpacity={1.0} style={styles.reminderOptionContainer} onPress={()=>this._onOptionPress('day')}>
            <Animatable.Text  ref="day" style={[styles.reminderOptionIcon,selectedOption == 'day' && styles.reminderOptionIconSelected]}>⏲️</Animatable.Text>
            <Text style={[styles.reminderOptionText,selectedOption == 'day' && styles.reminderOptionTextSelected]}>In a Day</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1.0} style={styles.reminderOptionContainer} onPress={()=>this._onOptionPress('week')}>
            <Animatable.Text ref="week" style={[styles.reminderOptionIcon,selectedOption == 'week' && styles.reminderOptionIconSelected]}>⏲️</Animatable.Text>
            <Text style={[styles.reminderOptionText,selectedOption == 'week' && styles.reminderOptionTextSelected]}>In a Week</Text>
          </TouchableOpacity>

        </Animatable.View>

      }

      <View>
      {
        selectedOption &&

          <Button animated rounded fat text="Set Reminder" onPress={()=>onSetReminderPress(selectedOption)} />
      }

      </View>

      </Animatable.View>
      )

  } else { return null; }
}
}
// --------------------------------------------------
//    CONFIRM REC
// --------------------------------------------------

export const Confirmation = (props) => {
  return null
  if(!props.user.initialFeeling && !props.showWelcome) return null;

  return (
    <Animatable.View animation="fadeIn" style={styles.welcomeContainer} >
      <Text style={styles.welcomeText}>Thanks for trying chaz.</Text>
      <Text style={styles.welcomeSubText}>An app that attempts to build empathy by encouraging you to follow up on all the great recommendations you receive.</Text>

    </Animatable.View>
    );


}
// --------------------------------------------------
//    BUTTON
// --------------------------------------------------

export const FirstRecButton = (props) => {


  if(props.titleInput != '' && !props.unfinished.title) {
    return (
      <Button animated text="Next" onPress={props.onSaveTitlePress} />
    )
  } else if(props.friendInput != '' && !props.unfinished.from) {
    return (
      <Button animated text="Next" onPress={props.onSaveFriendPress} />
    )

  // ENABLE NOTIFICATIONS
  } else if(props.unfinished.from && props.notificationPermission != "authorized") {
    return(
    <View>
      <EnableNotifications button />
      <Button animated rounded fat ghost text="No thanks" onPress={props.onNoThanksPress} />
    </View>
  )
  } else {
    return null
  }



}
