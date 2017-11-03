import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
const Permissions = require('react-native-permissions');
import { colors } from '../config/styles';
import { Button } from './Generic'
import { setNotificationPermission } from '../reducers/app/actions';


class EnableNotificationsContainer extends Component {

  componentWillMount() {
  const { notificationPermission, setNotificationPermission } = this.props;
  console.log('notificationPermission',notificationPermission)
  if(!notificationPermission) {
    Permissions.check('notification')
      .then(response => {
        setNotificationPermission(response)
      });
  }

  }
  _requestPermission = () => {
  const { setNotificationPermission } = this.props;
  firebase.messaging().requestPermissions()
    .then(()=> setNotificationPermission('authorized'))
    .catch(()=>console.log('notification permission rejected'));
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
  const { button } = this.props;

  if(button) {
    return <OrangeButton onPress={this._alertForNotificationPermission} />
  }

  return null

  // return (
  //   <View>
  //     <TouchableOpacity onPress={this._alertForNotificationPermission} activeOpacity={0.9}>
  //       <View style={[styles.container, styles.translucentBackground,{marginTop: 20}]}>
  //
  //         <View style={styles.iconContainer}>
  //           <Icon name="feather" color={colors.purple} size={25} />
  //         </View>
  //
  //       <View style={styles.textContainer}>
  //         <View style={styles.recContainer}>
  //           <Text style={styles.recText}>Follow Up</Text>
  //         </View>
  //       </View>
  //
  //     </View>
  //   </TouchableOpacity>
  //
  //   </View>
  //
  // );
}

};


const mapStateToProps = (state) => {
  return {
    notificationPermission: state.app.notificationPermission,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setNotificationPermission}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EnableNotificationsContainer);


export const OrangeButton = ({onPress}) => {

  return (
    <View style={{marginTop:20}}>
      <Button rounded bgcolor="orange" text="Enable Notifications" onPress={onPress} />
    </View>
  )

}
