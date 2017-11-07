import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
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
    <View style={styles.container}>

      {
        notificationPermission != 'authorized' &&
        <View style={{paddingHorizontal: 30}}>
          <Text style={styles.title}>Follow Up</Text>
          <Label center>Allow chaz to remind you about recommendations that you save. No spam</Label>
          <EnableNotifications button />
        </View>
      }

      {
        reminders.localReminders.length > 0 &&
        <View style={{paddingHorizontal: 30, flex:1,flexDirection: 'column'}}>
          <Text style={styles.title}>Reminders ({reminders.localReminders.length})</Text>
          {
            _.map(reminders.localReminders, (reminder,i) => {
              return (
                <View key={i} style={{flexDirection: 'row',backgroundColor: 'rgba(255,255,255,0.3)',marginBottom: 30,}}>
                <View style={{flex:2}} >
                  <Text>{moment(reminder.fire_date).fromNow()}</Text>
                </View>
                <View style={{flex:8,}} >
                  <Text>{reminder.body}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
      }

      {
        reminders.remoteNotifications.length > 0 &&
        <View style={{paddingHorizontal: 30, flex:1,flexDirection: 'column'}}>
          <Text style={styles.title}>Remote notifications ({reminders.remoteNotifications.length})</Text>
          {
            _.map(reminders.remoteNotifications, (notif,i) => {
              return (
                <View key={i} style={{flexDirection: 'row',backgroundColor: 'rgba(255,255,255,0.8)',paddingVertical: 5,marginBottom: 30,}}>
                <View style={{flex:2}} >
                  <Text>{notif.receivedAt && moment(notif.receivedAt).fromNow()}</Text>
                </View>
                <View style={{flex:8,}} >
                  <Text>{JSON.stringify(notif)}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      }

      {
        reminders.newRemoteNotifications.length > 0 &&
        <View style={{paddingHorizontal: 30, flex:1,flexDirection: 'column'}}>
          <Text style={styles.title}>New Remote notifications ({reminders.newRemoteNotifications.length})</Text>
          {
            _.map(reminders.newRemoteNotifications, (notif,i) => {
              return (
                <View key={i} style={{flexDirection: 'row',backgroundColor: 'rgba(255,255,255,0.8)',paddingVertical: 5,marginBottom: 30,}}>
                <View style={{flex:2}} >
                  <Text>{notif.receivedAt && moment(notif.receivedAt).fromNow()}</Text>
                </View>
                <View style={{flex:8,}} >
                  <Text>{JSON.stringify(notif)}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      }





    </View>
  );
}

export default Reminders;
