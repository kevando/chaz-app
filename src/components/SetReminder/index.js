import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
var PushNotification = require('react-native-push-notification');
const Permissions = require('react-native-permissions');
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import { colors } from '../../config/styles';
import styles from './styles';


class SetReminder extends Component {

  onSetReminderPress() {

    const { rec, notificationPermission } = this.props;

    if(notificationPermission == 'authorized') {

      Alert.alert(
        rec.friend,
        'Remind me to follow up in:',
        [
          {text: 'Tomorrow', onPress: this._setReminder.bind(this,1440)},
          {text: 'In a few days', onPress: this._setReminder.bind(this,4320)},
          {text: 'In a couple weeks', onPress: this._setReminder.bind(this,21600)},
          {text: 'In a month or so', onPress: this._setReminder.bind(this,43200)},
          {text: 'Nevermind', onPress: () => console.log('forget it'), style: 'cancel'},
        ]
      );
    } else {
      this._alertForNotificationPermission();
    }


  }

  _setReminder(reminderDateInMinutes) {
    const { setReminder, rec } = this.props;


    const reminderTimestamp = Date.now() + (reminderDateInMinutes * 60 * 1000);

    PushNotification.localNotificationSchedule({
      message: "Did you check out "+rec.title+'?',
      date: new Date(reminderTimestamp),
      title: rec.friend, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });

    setReminder(rec.id,reminderTimestamp);

  }

  _alertForNotificationPermission() {
    const { notificationPermission} = this.props.app;
    Alert.alert(
      'Let chaz remind you?',
      '',
      [
        {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
        notificationPermission == 'undetermined'?
            {text: 'OK', onPress: this._requestPermission.bind(this)}
          : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

  _requestPermission() {
    const { setNotificationPermission } = this.props;
    Permissions.requestPermission('notification', ['alert', 'badge', 'sound'])
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        setNotificationPermission(response);
      });
  }

  render() {
      if(this.props.rec.reminder){
        return (
            <Text style={styles.reminderText} >Reminder will go off in {moment(this.props.rec.reminder).fromNow()}</Text>
        );
      } else {
        return (
          <TouchableOpacity onPress={this.onSetReminderPress.bind(this)} >
            <Text style={{fontSize:15,color:colors.blue}} ><Icon name="add-alarm" size={13} color={colors.blue} style={{paddingHorizontal:3}}/>Set Reminder</Text>
          </TouchableOpacity>
        );
      }

  }
};


export default SetReminder;
