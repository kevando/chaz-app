import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
const Permissions = require('react-native-permissions')
import firebase from 'react-native-firebase'
import { colors } from '../config/styles';
import { Button } from './Generic'
import { checkNotificationPermission, requestNotificationPermission } from '../reducers/app/actions';


class EnableNotificationsContainer extends Component {

  componentWillMount() {
  const { notificationPermission, checkNotificationPermission } = this.props;

    if(!notificationPermission) {
      checkNotificationPermission()
    }

  }
  _requestPermission = () => {
    const { requestNotificationPermission } = this.props;
    requestNotificationPermission()

    // firebase.messaging().requestPermissions()
    //   .then((response)=> {
    //     console.warn('response: ',response)
    //     // setNotificationPermission('authorized')
    //   })
    //   .catch((error)=>console.warn('notification permission rejected',error));

  }

  _alertForNotificationPermission = () => {
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
  console.log()
  const { button, wrapper } = this.props;

  if(button) {
    return <OrangeButton onPress={this._alertForNotificationPermission} />
  }
  if(wrapper) {
    return (
      <TouchableOpacity onPress={this._alertForNotificationPermission} >
        {this.props.children}
      </TouchableOpacity>
    )
  }

  return null
}

};


const mapStateToProps = (state) => {
  return {
    notificationPermission: state.app.notificationPermission,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({checkNotificationPermission,requestNotificationPermission}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EnableNotificationsContainer);


export const OrangeButton = ({onPress}) => {

  return (
    <View style={{marginTop:20}}>
      <Button rounded bgcolor="orange" text="Enable Notifications" onPress={onPress} />
    </View>
  )

}
