import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const Permissions = require('react-native-permissions');
import { colors } from '../../config/styles';
import styles from './styles';


class NotificationPermission extends Component {

  constructor(props){
    super(props)
  this._alertForNotificationPermission = this._alertForNotificationPermission.bind(this)
  this._requestPermission = this._requestPermission.bind(this)
  }
  componentWillMount() {
  const { notificationPermission, setNotificationPermission } = this.props;
  if(!notificationPermission) {
    Permissions.check('notification')
      .then(response => {
        setNotificationPermission(response)
      });
  }

  }
  _requestPermission() {
  const { setNotificationPermission } = this.props;
  firebase.messaging().requestPermissions()
    .then(()=> setNotificationPermission('authorized'))
    .catch(()=>console.log('notification permission rejected'));
  }
  _alertForNotificationPermission() {
  const { notificationPermission } = this.props;

  Alert.alert(
    'Enable Notifications?',
    'Let chaz send you reminders',
    [
      {text: 'Not now', onPress: () => console.log('permission denied'), },
      notificationPermission == 'undetermined' || !notificationPermission ?
          {text: 'Sure', onPress: this._requestPermission}
        : {text: 'Open Settings', onPress: Permissions.openSettings}
    ]
  )
  }

render() {
  // const { onPress } = this.props;
  return (
    <View>
      <TouchableOpacity onPress={this._alertForNotificationPermission} activeOpacity={0.9}>
        <View style={[styles.container, styles.translucentBackground,{marginTop: 20}]}>

          <View style={styles.iconContainer}>
            <Icon name="feather" color={colors.purple} size={25} />
          </View>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>Follow Up</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>

    </View>

  );
}

};

export default NotificationPermission;
