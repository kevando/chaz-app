import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Feather';
const Permissions = require('react-native-permissions')
// import firebase from 'react-native-firebase'
import { colors } from '../config/styles';
import { Button } from './Generic'
import { checkNotificationPermission, requestNotificationPermission } from '../reducers/app/actions';


class EnableNotificationsContainer extends Component {

  componentWillMount() {
  const { notificationPermission, checkNotificationPermission } = this.props;

    if(!notificationPermission) {
      checkNotificationPermission()
    }
    // console.warn(notificationPermission)
  }

  _requestPermission = () => {
    const { requestNotificationPermission } = this.props;
    requestNotificationPermission()
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

  const { button, wrapper, text="Enable Notifications" } = this.props;

  if(button) {
    return <OrangeButton text={text} onPress={this._alertForNotificationPermission} />
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


export const OrangeButton = ({onPress, text}) => {

  return (
    <View style={{marginTop:20}}>
      <Button rounded fat bgcolor="orange" text={text} onPress={onPress} />
    </View>
  )

}
