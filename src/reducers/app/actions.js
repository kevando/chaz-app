const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
  USER_SIGNED_IN,
} from '../actionTypes';
import { listenForRecs } from '../recommendations/actions'
import { listenForFriends } from '../friends/actions'
import { setUserToken } from '../user/actions'

export function initializeApp() {
  return (dispatch, getState) => {



      // Kick off auth listener to handle updating user object
      // This will fire every time the app loads no matter what
      firebase.auth().onAuthStateChanged(function(user) {
        console.log('auth state changed')
        // Add user data to redux (registered or anon)
        // Fire off event listeners
        if (user) {

          dispatch({ type: USER_SIGNED_IN, user })

          // Start some Firestore data listeners to handle ALL data
          // Note: this may become an issue if user is without internet
          dispatch(listenForRecs(user.uid))
          dispatch(listenForFriends(user.uid))

          // I handle this when user registers
          // if(!user.isAnonymous) {
          //     dispatch(setUserToken())
          // }

        } else {
          // No user is signed in. so lets authenticate anon
          firebase.auth().signInAnonymously()
              .then(() => {
                console.log('signInAnonymously SUCCESS')
              });
        }
      });
  }


}




export function setNotificationPermission(response) {
  return { type: SET_NOTIFICATION_PERMISSION, response}
}
