import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
var PushNotification = require('react-native-push-notification');
// const Permissions = require('react-native-permissions');
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import firebase from 'react-native-firebase'
import { colors, text } from '../config/styles';

import { Button } from './Generic'



export class SetReminderButton extends Component {

    constructor(props){
      super(props)
      this.state = { showCard: false }
      // this._setReminder = this._setReminder.bind(this)
      this._onSetReminderPress = this._onSetReminderPress.bind(this)
    }
    componentWillMount() {
      // console.log(Permissions)
      // Permissions.check('notification')
      //   .then(response => {
      //     //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      //     // this.setState({ photoPermission: response })
      //     console.log(response)
      //     if(response == 'authorized')
      //       this.setState({showCard: true, notificationPermission: response})
      //   });
    }

    _onSetReminderPress() {

      const { rec } = this.props;

        Alert.alert(
          rec.friend.name,
          'Remind me to follow up in:',
          [
            {text: 'In one minute', onPress: this._setReminder.bind(this,1)},
            // {text: 'In a 20 minutes', onPress: this._setReminder.bind(this,20)},
            {text: 'Tomorrow', onPress: this._setReminder.bind(this,1440)},
            {text: 'In a few days', onPress: this._setReminder.bind(this,4320)},
            {text: 'In a couple weeks', onPress: this._setReminder.bind(this,21600)},
            {text: 'In a month or so', onPress: this._setReminder.bind(this,43200)},
            {text: 'Nevermind', onPress: () => console.log('forget it'), style: 'cancel'},
          ]
        );


    }
    _setReminder(reminderDateInMinutes) {
      const { updateRecommendation, rec } = this.props;


      const reminderTimestamp = Date.now() + (reminderDateInMinutes * 60 * 1000);

      firebase.messaging().scheduleLocalNotification({
              title:'some title',
              fire_date: new Date(reminderTimestamp),      //RN's converter is used, accept epoch time and whatever that converter supports
              id: rec.id,    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
              body: "from future past",
              // repeat_interval: "week" //day, hour
          })

      // PushNotification.localNotificationSchedule({
      //   message: "Did you check out "+rec.title+'?',
      //   date: new Date(reminderTimestamp),
      //   title: rec.friend, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      //   playSound: true, // (optional) default: true
      //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      // });

      rec.reminder = reminderTimestamp
      updateRecommendation(rec);

    }

    render() {
      // console.log(firebase.messaging())
      // firebase.messaging().getScheduledLocalNotifications().then(notif=>console.log(notif));
      // if(!this.state.showCard) { return null

      const { rec, app } = this.props;

      if(app.notificationPermission != 'authorized') { return null }

      return (
        <View style={styles.container}>

            {rec.reminder && moment(rec.reminder).isAfter() ?
              <Text style={styles.recText}>{moment(rec.reminder).fromNow()}</Text> :
              <Button bgcolor="yellow" rounded onPress={this._onSetReminderPress} text="Set a reminder" />
            }
        </View>
      );
    }

};

const styles = StyleSheet.create({

  container: {
    marginTop: 30,
    paddingHorizontal: 20
  },

  reminderText: {
    ...text,
    fontSize: 12,
    color: colors.darkGrey,
    lineHeight: 17,
  },

});
