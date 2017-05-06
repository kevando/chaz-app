import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
var PushNotification = require('react-native-push-notification');
import { Icon } from 'native-base';

import styles from './styles';


class SetReminder extends Component {

  onSetReminderPress() {

    const { setReminder, rec } = this.props;

    Alert.alert(
      rec.friend,
      'Remind me to follow up in:',
      [
        {text: 'Tomorrow', onPress: () => setReminder(rec.id,'tomorrow')},
        {text: 'In a few days', onPress: () => setReminder(rec.id,'few days')},
        {text: 'In a couple weeks', onPress: () => setReminder(rec.id,'couple weeks')},
        {text: 'In a month or so', onPress: () => setReminder(rec.id,',month')},
        {text: 'Forget it', onPress: () => console.log('forget it'), style: 'cancel'},
      ]
    );
    // setReminder actually does not handle the 2nd argument yet

    // ------

    // @todo probly put this code elsewhere
    PushNotification.localNotificationSchedule({
      message: "Did you check out "+rec.title, // (required)
      date: new Date(Date.now() + (5000 * 60 * 1000)), // in ~ 3 days
      title: rec.friend, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });

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
