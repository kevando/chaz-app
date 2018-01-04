import * as t from '../actionTypes';
import firebase from 'react-native-firebase'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'

const messaging = firebase.messaging()

export const setRecReminder = (reminderDateInMinutes,rec) => (dispatch) =>
  new Promise((resolve, reject) => {

    const reminderTimestamp = Date.now() + (reminderDateInMinutes * 60 * 1000);

    messaging.scheduleLocalNotification({
      title:'Hey, it\'s been a while',
      show_in_foreground: true,
      // friend: rec.friend,
      recId: rec.id,
      fire_date: new Date(reminderTimestamp),      //RN's converter is used, accept epoch time and whatever that converter supports
      id: rec.id,    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
      body: `Did you check out ${rec.friend.name}'s' ${rec.category.title} recommendation?`,
      // actions: ["Yes I did", "No I did not"] // dont work
    })
    resolve(reminderTimestamp)
  })

// ------------------------------------
//   get local notifs
// ------------------------------------

export const getScheduledReminders = () => (dispatch) =>
  new Promise((resolve, reject) => {

    messaging.getScheduledLocalNotifications()
      .then(notif=>{
        console.warn('notif')
        console.log(notif)
        resolve(notif)
      })

  })



  // --------------------------------
  //    HANDLE NOTIFICATIONS
  // --------------------------------
  //
  export function listenForNotifications() {
    return dispatch => {



      // pull notifs into redux
      messaging.getScheduledLocalNotifications()
        .then(localReminders => {
          dispatch({type: t.PUSH_LOCAL_REMINDERS, localReminders})
        })


        // do somrtghing on a notification
      messaging.onMessage( (notification) => {
        // console.warn('onMessage!!', notification)
        if(!notification.local_notification){
          console.warn('! local_notification',notification)
          if(notification.recId)
            Actions.push('RecView', {recId: notification.recId})
          // console.warn('go to '+notification.recId)
          // idk what this does or why, removing for now
          // dispatch({type: t.ADD_REMOTE_REMINDER, notification: {...notification, receivedAt: Date.now()}})
        } else {
          // Local notification means the user set a reminder
          Actions.push('RecView', {recId: notification.recId})
          // console.warn('action',notification.action)
        }
      })

      // @todo
      // this is bugging right now per github issues threads
      messaging.getInitialNotification().then(notif=>{
        if(notif) {
          console.warn('getInitialNotification', notif)
        }
      });
    }
  }

  // ------------------------------------
  //   tmp way of doing all this
  // ------------------------------------

  export const clearNewRemoteMessages = () => (dispatch) =>
    dispatch({type: t.CLEAR_NEW_REMOTE_NOTIFICATIONS})
