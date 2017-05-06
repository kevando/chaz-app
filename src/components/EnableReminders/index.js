import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
const Permissions = require('react-native-permissions');
import { Button } from 'native-base';

import styles from './styles';


class EnableReminders extends Component {

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

    const { notificationPermission } = this.props.app;

    if(notificationPermission == 'undetermined' || notificationPermission == 'restricted' || notificationPermission == 'denied') {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>Follow Up with you friends</Text>
          <Button warning onPress={this._alertForNotificationPermission.bind(this)}>Enable Notifications</Button>
        </View>
      );
    } else {
      return null;
    }


  }
};


export default EnableReminders;
