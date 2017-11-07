import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import EnableNotifications from '../../components/EnableNotifications'
import { Label, Title } from '../../components/Generic';
import Card  from '../../components/Card/Rec';
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import styles from './styles';

const Reminders = (props) => {

  const { notificationPermission, reminders } = props;
  console.log(reminders)
  return (
    <ScrollView style={styles.container}>

      {
        notificationPermission != 'authorized' &&
        <View style={{paddingHorizontal: 30}}>
          <Text style={styles.title}>Follow Up</Text>
          <Label>Allow chaz to remind you about recommendations that you save. No spam</Label>
          <EnableNotifications button />
        </View>
      }

      {
        reminders.localReminders.length > 0 &&
        <View style={styles.wrapper}>
          <Text style={styles.title}>Follow Up Reminders</Text>
          {
            _.map(reminders.localReminders, (reminder,i) => {
              return (
                <View key={i} style={styles.row}>
                <Label>Recommendation: {moment(reminder.fire_date).fromNow()}</Label>
                </View>
              )
            })
          }

        </View>
      }

      {
        reminders.newRemoteNotifications.length > 0 &&
        <View style={styles.wrapper}>
          <Text style={styles.title}>Inbox</Text>
          {
            _.map(reminders.remoteNotifications, (notif,i) => {
              return (
                <View key={i} style={styles.row}>
                <Label>{notif.notification.body} ({moment(notif.receivedAt).fromNow()})</Label>
                </View>
              )
            })
          }
        </View>
      }

      {
        reminders.remoteNotifications.length > 0 &&
        <View style={styles.wrapper}>
          <Text style={styles.title}>All Messages</Text>
          {
            _.map(reminders.remoteNotifications, (notif,i) => {
              return (
                <View key={i} style={styles.row}>
                <Label>{notif.notification.body} ({moment(notif.receivedAt).fromNow()})</Label>
                </View>
              )
            })
          }
        </View>
      }







    </ScrollView>
  );
}

export default Reminders;
