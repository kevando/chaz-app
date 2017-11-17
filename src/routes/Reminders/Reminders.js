import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import EnableNotifications from '../../components/EnableNotifications'
import { Label, Title } from '../../components/Generic';
import Icon from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import styles from './styles';

const Reminders = (props) => {

  const { notificationPermission, reminders } = props;
  console.log(reminders)
  return (
    <View style={styles.container}>

    {
      notificationPermission == 'authorized' &&
      <Animatable.View animation="bounceIn" duration={1000} delay={400} style={styles.checkIconContainer} >
        <Icon name="check-circle" size={90} color="white" />
        </Animatable.View>
      }

      {
        notificationPermission != 'authorized' &&
        <View style={{}}>
          <Text style={styles.title}>Follow Up</Text>
          <Label>Allow chaz to remind you about recommendations that you save. No spam</Label>
          <EnableNotifications button />
        </View>
      }




    </View>
  );
}

export default Reminders;
