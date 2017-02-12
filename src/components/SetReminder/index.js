import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
var PushNotification = require('react-native-push-notification');
import { Button } from 'native-base';

import styles from './styles';


class SetReminder extends Component {

  constructor(props) {
    super(props);
    this.state = { notificationPermission:  null } // pre-check
  }

  // componentDidMount() {
  //   Permissions.getPermissionStatus('notification')
  //     .then(response => {
  //       //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
  //       this.setState({ notificationPermission: response })
  //     });
  // }

  setReminder() {

    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + (6 * 1000)) // in 6 secs
    });

  }


  render() {

    // if(this.state.notificationPermission == 'authorized') {
      return (
        <View>

          <Button warning onPress={this.setReminder.bind(this)}>Set Reminder</Button>
        </View>
      );
    // } else {
    //   return null;
    // }


  }
};


export default SetReminder;
