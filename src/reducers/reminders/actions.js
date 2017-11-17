import * as t from '../actionTypes';
import firebase from 'react-native-firebase'
import moment from 'moment'
import {Categories} from '../../components/Category'

const messaging = firebase.messaging()

export const setRecReminder = (reminderDateInMinutes,rec) => (dispatch) =>
  new Promise((resolve, reject) => {

    const reminderTimestamp = Date.now() + (reminderDateInMinutes * 60 * 1000);

    messaging.scheduleLocalNotification({
      title:'Reminder',
      show_in_foreground: true,
      // friend: rec.friend,
      // recTitle: rec.title,
      fire_date: new Date(reminderTimestamp),      //RN's converter is used, accept epoch time and whatever that converter supports
      id: 'rec_'+rec.id,    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
      body: `${moment(rec.createdAt).fromNow()} ${rec.friend.name} recommended ${rec.title}. Did you ${Categories[rec.category].verb} out?`,
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
        console.warn('onMessage!!', notification)
        if(!notification.local_notification)
          dispatch({type: t.ADD_REMOTE_REMINDER, notification: {...notification, receivedAt: Date.now()}})
      })

      // @todo
      // this is bugging right now per github issues threads

      messaging.getInitialNotification().then(notif=>{
        console.log('initial notif',notif)
        if(!notif) {

          // turning this off cause its annoying
          // dispatch({type: SET_APP_ERROR, error: {message: 'InitialNotification is empty'} })
        } else {
          console.warn('getInitialNotification', notif)
          // this apperantly works. not sure what the notif object is like
          // and not too sure how to redirect the user to a different page
          // dispatch({type: t.SET_APP_STATUS, status: 'Initial Notification is not empty!'})
        }
      });
    }
  }

  // ------------------------------------
  //   tmp way of doing all this
  // ------------------------------------

  export const clearNewRemoteMessages = () => (dispatch) =>
    dispatch({type: t.CLEAR_NEW_REMOTE_NOTIFICATIONS})
