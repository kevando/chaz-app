import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import moment from 'moment';
import { Actions} from 'react-native-router-flux';

// import { colors } from '../../config/styles';
import styles from './styles';
// import SetReminder from '../../components/SetReminder';
import Button from '../../components/Button';
const Permissions = require('react-native-permissions');


class OnboardingCard extends Component {

  constructor(props){
    super(props)
    this.state = { showCard: false }
    this._alertForNotificationPermission = this._alertForNotificationPermission.bind(this)
    this._requestPermission = this._requestPermission.bind(this)
  }
  componentWillMount() {
    console.log(Permissions)
    Permissions.check('notification')
      .then(response => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        // this.setState({ photoPermission: response })
        console.log(response)
        if(response == 'undetermined')
          this.setState({showCard: true, notificationPermission: response})
      });
  }
  _requestPermission() {
    // const { setNotificationPermission } = this.props;
    Permissions.request('notification', ['alert', 'badge', 'sound'])
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        // setNotificationPermission(response);
        this.setState({showCard: false, notificationPermission: response})
      });
  }

  _alertForNotificationPermission() {
    const { notificationPermission } = this.state;

    Alert.alert(
      'Enable Notification Permissions',
      'chaz needs this permission to send you reminders',
      [
        {text: 'No way', onPress: () => console.log('permission denied'), },
        notificationPermission == 'undetermined' || !notificationPermission ?
            {text: 'Sure', onPress: this._requestPermission}
          : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

render() {
  if(!this.state.showCard)
    return null

  // const { rec, setStatus, setGrade, setReminder, notificationPermission, totalRecs } = this.props;
  return (

        <View style={styles.container}>
          <Text style={styles.title}>Be a Good Friend</Text>
          <Text style={styles.paragraph}>Let chaz remind you to follow up on this recommendation</Text>
          <Button text="Enable Notifications" bgcolor ="orange" onPress={this._alertForNotificationPermission} />


      </View>

  );
}


};

export default OnboardingCard;
