import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
var PushNotification = require('react-native-push-notification');
import { Icon } from 'native-base';

import styles from './styles';


class SetReminder extends Component {

  onSetReminderPress() {

    const { setReminder, rec } = this.props;
    setReminder(rec.id);
    alert('Reminder set for 2 minutes');

    // @todo probly put this code elsewhere
    PushNotification.localNotificationSchedule({
      message: "Did you check out "+rec.title, // (required)
      date: new Date(Date.now() + (2 * 60 * 1000)), // in 2 minutes
      title: rec.friend, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });

  }


  render() {


    // if(this.state.notificationPermission == 'authorized') {
      return (


          <Text onPress={this.onSetReminderPress.bind(this)} style={{fontSize:15,color:'#bbb'}} ><Icon name="ios-alarm"  style={{color: '#ffc125',fontSize:20}} />&nbsp;Set a reminder to follow up</Text>

      );
    // } else {
    //   return null;
    // }


  }
};


export default SetReminder;
