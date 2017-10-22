const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
} from './actionTypes';


export function initializeApp() {
  return dispatch => {
    firebase.auth().signInAnonymously()
      .then(() => {
        // console.log(firebase.auth().currentUser)
        dispatch({ type: INITIALIZE_APP, uid: firebase.auth().currentUser._user.uid })
      });
  }


}

// export function checkNotificationPermission() {
//   // Thunk allows this async action
//   return function (dispatch) {
//     Permissions.getPermissionStatus('notification')
//       .then(response => {
//         dispatch({ type: SET_NOTIFICATION_PERMISSION, response })
//       });
//   };
// }

export function setNotificationPermission(response) {
  return { type: SET_NOTIFICATION_PERMISSION, response}
}
