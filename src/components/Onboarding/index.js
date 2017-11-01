import React, { Component } from 'react';
import { Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import NotificationPermissionCard from '../Card/NotificationPermission';

import * as AppActions from '../../reducers/app/actions';


class NotificationPermissionContainer extends Component {
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
  // console.log('OB',this.props)
  const { notificationPermission } = this.props;
  if(notificationPermission != null && notificationPermission !== 'authorized') {
    return (<NotificationPermissionCard onPress={this._alertForNotificationPermission} />);
  } else {
    return null
  }

}


};



const mapStateToProps = (state) => {
  return {
    notificationPermission: state.app.notificationPermission,
  };
};

// map dispatch to props

export const NotificationPermission = connect(mapStateToProps, {...AppActions})(NotificationPermissionContainer);
