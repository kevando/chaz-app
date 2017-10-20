import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import moment from 'moment';
import { Actions} from 'react-native-router-flux';

// import { colors } from '../../config/styles';
import styles from './styles';
// import SetReminder from '../../components/SetReminder';
import Button from '../../components/Button';


class OnboardingCard extends Component {

  _onButtonPress() {
    // if(this.props.unfinished) return; // dont allow expand if rec isnt saved
    // Actions.push('RecView',{rec: this.props.rec})
  }

render() {
  const { rec, setStatus, setGrade, setReminder, notificationPermission, totalRecs } = this.props;
  return (

        <View style={styles.container}>
          <Text style={styles.title}>Be a Good Friend</Text>
          <Text style={styles.paragraph}>Let chaz remind you to follow up on this recommendation</Text>
          <Button text="Enable Notifications" bgcolor="orange" onPress={this._onButtonPress} />


      </View>

  );
}


};

export default OnboardingCard;
