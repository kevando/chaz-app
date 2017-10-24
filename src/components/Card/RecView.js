import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import _ from 'lodash'
import { Actions} from 'react-native-router-flux';
import { Categories, CategoryIcon } from '../../components/Category/Icon';
import { colors } from '../../config/styles';
import styles from './styles';
import firebase from 'react-native-firebase'
const Permissions = require('react-native-permissions');
var PushNotification = require('react-native-push-notification');


class TitleCard extends Component {



render() {

  const { rec, onEditPress } = this.props;
  // console.log('titlecard render',rec)
  return (
    <View>
      <TouchableOpacity onPress={onEditPress} activeOpacity={0.9}>
        <View style={[styles.container]}>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>

          </View>
        </View>

      </View>
    </TouchableOpacity>
    <View>


    </View>

    </View>
  );
}


};


class FriendCard extends Component {

  render() {
    const { friend } = this.props;
    return (
      <TouchableOpacity onPress={()=>Actions.push('FriendView',{friend})}>
      <View style={[styles.container]}>

        <View style={styles.iconContainer}>
          <Icon name='user' color={friend.uid ? colors.orange : colors.grey} size={25} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            {friend.uid ?
              <Text style={styles.recText}>{friend.name}</Text> :
              <Text style={[styles.recText,{color:colors.darkGrey}]}>{friend.name}</Text>
            }
          </View>
        </View>

      </View>
      </TouchableOpacity>
    );
  }

};

class CategoryPicker extends Component {

  render() {
    const { rec, onCategoryPress } = this.props;
    return (
      <View style={styles.pickerContainer}>
        {
          _.map(Categories, (category,i) => {
            return (
              <View style={styles.categoryTouchable} key={i} >
              <TouchableOpacity onPress={() => onCategoryPress(rec,category)}>
              <View style={styles.textContainer}>
                <View style={styles.recContainer}>
                  <Text style={styles.categoryOptionText}><CategoryIcon category={category} size={16} color="blue" />&nbsp;{category.title}</Text>
                </View>
              </View>
              </TouchableOpacity>
              </View>
            )
          })
        }

      </View>
    );
  }

};

class CategoryCard extends Component {

  render() {
    const { rec } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.iconContainer}>
          <CategoryIcon category={rec.category} size={20}/>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.category.title}</Text>
          </View>
        </View>
      </View>
    );
  }

};

export class ReminderCard extends Component {

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
    firebase.messaging().getScheduledLocalNotifications().then(notif=>console.log(notif));
    // if(!this.state.showCard) { return null }

    const { rec, app } = this.props;

    if(app.notificationPermission != 'authorized') { return null }

    return (
      <View style={[styles.container]}>
        <View style={styles.iconContainer}>
          <Icon name="watch" size={20} color={colors.orange}/>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
          {rec.reminder && moment(rec.reminder).isAfter() ?
            <Text style={styles.recText}>{moment(rec.reminder).fromNow()}</Text> :
            <Text style={styles.recText} onPress={this._onSetReminderPress}>Set a reminder</Text>
          }

          </View>
        </View>
      </View>
    );
  }

};


export {
  TitleCard,
  FriendCard,
  CategoryCard,
  CategoryPicker,
}
