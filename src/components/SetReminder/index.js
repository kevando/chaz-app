import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
var PushNotification = require('react-native-push-notification');
import { Icon } from 'native-base';

import styles from './styles';


class SetReminder extends Component {

  onSetReminderPress() {
    const { rec } = this.props;

    Alert.alert(
      rec.friend,
      'Remind me to follow up in:',
      [
        {text: 'Tomorrow', onPress: this._setReminder.bind(this,1440)},
        {text: 'In a few days', onPress: this._setReminder.bind(this,4320)},
        {text: 'In a couple weeks', onPress: this._setReminder.bind(this,21600)},
        {text: 'In a month or so', onPress: this._setReminder.bind(this,43200)},
        {text: 'Forget it', onPress: () => console.log('forget it'), style: 'cancel'},
      ]
    );
  }

  _setReminder(reminderDateInMinutes) {
    const { setReminder, rec } = this.props;

    PushNotification.localNotificationSchedule({
      message: "Did you check out "+rec.title+'?',
      date: new Date(Date.now() + (reminderDateInMinutes * 60 * 1000)),
      title: rec.friend, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });

    setReminder(rec.id);
    // setReminder actually does not handle the 2nd argument yet
    // still just a boolean
  }

  render() {
    if(this.props.notificationPermission == 'authorized') {
      return (
        <TouchableOpacity onPress={this.onSetReminderPress.bind(this)} >
          <Text style={{fontSize:15,color:'#bbb'}} ><Icon name="ios-alarm"  style={{color: '#ffc125',fontSize:20}} />&nbsp;Set a reminder to follow up</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
};


export default SetReminder;
