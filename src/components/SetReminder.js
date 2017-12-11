import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
var PushNotification = require('react-native-push-notification');
// const Permissions = require('react-native-permissions');
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import firebase from 'react-native-firebase'
import { colors, text } from '../config/styles';
import * as Animatable from 'react-native-animatable'
import { Button } from './Generic'



export class SetReminderIcon extends Component {

    constructor(props){
      super(props)
      this.state = { showCard: false }
      // this._setReminder = this._setReminder.bind(this)
      this._onSetReminderPress = this._onSetReminderPress.bind(this)
    }

    _onSetReminderPress() {

      const { rec } = this.props;

        Alert.alert(
          rec.friend.name,
          'Remind me to follow up in:',
          [
            {text: 'In one minute', onPress: this._setReminder.bind(this,1)},
            {text: 'In 5 minutes', onPress: this._setReminder.bind(this,5)},
            {text: 'In 20 minutes', onPress: this._setReminder.bind(this,20)},
            {text: 'Tomorrow', onPress: this._setReminder.bind(this,1440)},
            {text: 'In a few days', onPress: this._setReminder.bind(this,4320)},
            {text: 'In a couple weeks', onPress: this._setReminder.bind(this,21600)},
            {text: 'In a month or so', onPress: this._setReminder.bind(this,43200)},
            {text: 'Nevermind', onPress: () => console.log('forget it'), style: 'cancel'},
          ]
        );


    }
    _setReminder(reminderDateInMinutes) {
      const { updateRec, rec, setRecReminder } = this.props;
      // !rec.friend.name && console.warn('no friend name!!')
      setRecReminder(reminderDateInMinutes, rec)
        .then(reminderTimestamp => {
          // console.warn(reminderTimestamp)
          rec.reminder = reminderTimestamp
          updateRec(rec.id,{reminder: reminderTimestamp});
        })

    }

    render() {
      // console.log(firebase.messaging())
      // firebase.messaging().getScheduledLocalNotifications().then(notif=>console.log(notif));
      // if(!this.state.showCard) { return null

      const { rec, app, color=colors.yellow } = this.props;

      if(app.notificationPermission != 'authorized') { return null }


      return (
        <Animatable.View animation="swing" iterationCount={'infinite'} duration={2000}>
          <Icon style={styles.optionIcon} onPress={this._onSetReminderPress} name="bell" color={color} />
          </Animatable.View>
      )

      // rec.reminder && moment(rec.reminder).isAfter() &&
      //   return (<Icon onPress={this._onSetReminderPress} name="bell" color="yellow" />)
      //
      // rec.reminder && moment(rec.reminder).isBefore() &&
      //   return <Icon onPress={this._onSetReminderPress} name="bell" color="white" />



    }

};

const styles = StyleSheet.create({

  container: {
    marginTop: 30,
    paddingHorizontal: 20
  },

  reminderText: {
    ...text,
    fontSize: 12,
    color: colors.darkGrey,
    lineHeight: 17,
  },
  optionIcon: {
    padding: 5,
    margin: 5,
    fontSize: 17,
    // backgroundColor: 'yellow',
  },

});




export class SetReminderButton extends Component {

    constructor(props){
      super(props)
      this.state = { showCard: false }
      // this._setReminder = this._setReminder.bind(this)
      this._onSetReminderPress = this._onSetReminderPress.bind(this)
    }

    _onSetReminderPress() {

      const { rec } = this.props;

        Alert.alert(
          'Set a new reminder',
          'Remind me to follow up in:',
          [
            {text: 'In one minute', onPress: this._setReminder.bind(this,1)},
            {text: 'In 5 minutes', onPress: this._setReminder.bind(this,5)},
            {text: 'In 20 minutes', onPress: this._setReminder.bind(this,20)},
            {text: 'Tomorrow', onPress: this._setReminder.bind(this,1440)},
            {text: 'In a few days', onPress: this._setReminder.bind(this,4320)},
            {text: 'In a couple weeks', onPress: this._setReminder.bind(this,21600)},
            {text: 'In a month or so', onPress: this._setReminder.bind(this,43200)},
            {text: 'Nevermind', onPress: () => console.log('forget it'), style: 'cancel'},
          ]
        );


    }
    _setReminder(reminderDateInMinutes) {
      const { updateRec, rec, setRecReminder } = this.props;
      // !rec.friend.name && console.warn('no friend name!!')
      setRecReminder(reminderDateInMinutes, rec)
        .then(reminderTimestamp => {
          // console.warn(reminderTimestamp)
          rec.reminder = reminderTimestamp
          updateRec(rec.id,{reminder: reminderTimestamp});
        })

    }

    render() {

      const { rec, app, color=colors.yellow } = this.props;

      if(app.notificationPermission != 'authorized') { return null }


      return (
        <Button rounded bgcolor="orange" text="Not Yet" small onPress={this._onSetReminderPress} />
      )

    }

};
