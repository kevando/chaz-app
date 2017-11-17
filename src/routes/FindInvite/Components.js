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

const DELAY = 300
const DURATION = 300

// --------------------------------------------------
//    NAME
// --------------------------------------------------

export const Zap = (props) => {

  return (
    <Animatable.View style={styles.greetingContainer} animation="fadeIn" delay={DELAY} duration={DURATION}>
      <Text style={styles.greetingText} onPress={props.logout}>{props.user.displayName},</Text>
    </Animatable.View>
    );
}

// --------------------------------------------------
//    NAME
// --------------------------------------------------

export const Name = (props) => {

  return (
    <Animatable.View style={styles.greetingContainer} animation="fadeIn" delay={DELAY} duration={DURATION}>
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

    const { unfinished } = this.props
      if(!unfinished.title) {



      return (
        <Animatable.View style={styles.feelingQuestionContainer} ref="CONTAINER" animation="fadeIn" delay={DELAY} duration={DURATION}>
          <Text style={styles.feelingQuestionText}>What is the last thing someone recommended to you?</Text>

          {!this.props.unfinished.title ?
          <TextInput
            onChangeText={(text)=>this.props.updateState({titleInput: text})}
            placeholder=''
            value={this.props.inputTitle}
            autoCorrect={false}
            style={[styles.inputTitle,{borderBottomColor: 'rgba(255,255,255,0.6)',color: 'rgba(255,255,255,0.9)'}]}
            caretHidden={false}
            selectionColor={'rgba(255,255,255,0.4)'}
            autoFocus={true}
          /> :
          <Text style={[styles.inputTitle,{}]}>{this.props.unfinished.title}</Text>
        }

          <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">

          </Animatable.View>
        </Animatable.View>
        );

      } else {return null;}
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

    const { unfinished } = this.props

    if(unfinished.title && !unfinished.from) {


      return (
        <Animatable.View style={styles.feelingQuestionContainer} ref="CONTAINER" animation="fadeIn" delay={DELAY} duration={DURATION}>
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
            multiline={false}
            autoFocus={true}
          /> :
          <Text style={[styles.inputTitle,{}]}>{this.props.unfinished.title}</Text>
        }

          <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">

          </Animatable.View>
        </Animatable.View>
        );

      } else {return null;}
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

  state = { selectedOption: null, showOptions: false }

  _onOptionPress = (option) => {
    this.setState({selectedOption: option})
    this.refs[option].swing().then(()=> {

      // this.setState({selectedOption: option})
    })

  }

  render() {
  // return null

  const { unfinished, notificationPermission, onSetReminderPress, onNoThanksPress } = this.props
  const { selectedOption, showOptions } = this.state
  // console.warn(selectedOption)
  if(unfinished.from){
    return (
      <Animatable.View animation="fadeIn" style={styles.welcomeContainer} >

      <Text style={styles.feelingQuestionText}>When {unfinished.from.name} recommended</Text>
      <Text style={[styles.titleText,{}]}>{unfinished.title},</Text>


      <Text style={[styles.feelingQuestionText,{}]}>Did it seem urgent?</Text>

      {
        false && !selectedOption && !showOptions && notificationPermission == 'authorized' &&
        <View style={{marginTop: 30}}>
          <Button animated rounded fat ghost text="Yes Lets Set a Reminder" onPress={()=>this.setState({showOptions: true})} />
          <Button animated rounded fat ghost text="Not really" onPress={onNoThanksPress} />
        </View>

      }

      {
        !selectedOption && !showOptions && notificationPermission != 'authorized' &&
        <View style={{marginTop: 30}}>

          <EnableNotifications button text="Yes, lets set a reminder" />
          <Button animated rounded fat ghost text="Not really" onPress={onNoThanksPress} />

        </View>

      }

      {
        notificationPermission == 'authorized' &&

        <Animatable.View animation="fadeIn" style={styles.reminderOptionsContainer} >

          <Text style={[styles.titleText,{fontSize: 20}]}>When do you want a reminder?</Text>

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
//    BUTTON
// --------------------------------------------------

export const FindInviteButton = (props) => {


  if(props.titleInput != '' && !props.unfinished.title) {
    return (
      <Button animated text="Next" onPress={props.onSaveTitlePress} />
    )
  } else if(props.friendInput != '' && !props.unfinished.from) {
    return (
      <Button animated text="Next" onPress={props.onSaveFriendPress} />
    )

  // ENABLE NOTIFICATIONS
} else if(false && props.unfinished.from && props.notificationPermission != "authorized") {
    return(
    <View>
      <EnableNotifications button />
      <Button animated rounded fat ghost text="Not really" onPress={props.onNoThanksPress} />
    </View>
  )
  } else {
    return null
  }



}
