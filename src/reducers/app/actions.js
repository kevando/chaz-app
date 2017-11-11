const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import * as t from '../actionTypes'

import { listenForAuthChanges, usersRef } from '../../config/firebase'
import { createUserInFirestore } from '../user/actions'
import { listenForNotifications } from '../reminders/actions'



// --------------------------------
//    INIT APP
// --------------------------------

export function initializeApp() {
  return (dispatch, getState) => {
    const app = getState().app
    // const user = getState().user

    // // Kick everything off
    dispatch(listenForAuthChanges())
    dispatch(listenForNotifications())

    // console.warn('init app',app)
    if(!app.token)
      dispatch(setToken())

    if(!app.notificationPermission)
      dispatch(checkNotificationPermission())
  }
}

// --------------------------------
//    SET APP DATA
// --------------------------------
export function setAppData(data) {
  return (dispatch, getState) => {
    dispatch({type: t.SET_APP_DATA, data })
  }
}
// --------------------------------
//    GET FCM TOKEN
// --------------------------------

function setToken() {
  return (dispatch, getState) => {
      firebase.messaging().getToken().then(token => {
        if(token !== getState().app.token) {
          console.log('setting app token')
          dispatch({type: t.SET_TOKEN, token})
        }
      })
  }
}
// In case things get out of whack
export function refreshServerToken() {
  return (dispatch, getState) => {
      firebase.messaging().getToken().then(token => {
          usersRef.doc(getState().user.uid).update({token})
      })
  }
}

// --------------------------------
//    VERIFY PHONE NUMBER
// --------------------------------

export function verifyPhone(phoneNumber) {
  return (dispatch, getState) => {

    dispatch({type: t.SIGN_IN_ATTEMPT })
    dispatch(shouldAppSignIn(phoneNumber)) // find out if this is a returning user

    const formatedNumber = `+1${phoneNumber}`

    firebase.auth().verifyPhoneNumber(formatedNumber)
      .then(phoneAuthSnapshot => {
        const { verificationId } = phoneAuthSnapshot;
        dispatch({type: t.SIGN_IN_CONFIRM_RESULT, verificationId, formatedNumber })
        dispatch({type: t.SET_USER_DATA, data: {phoneNumber: phoneNumber} })
      })
      .catch(error => dispatch({type: t.SET_APP_ERROR, error }) );
  }
}


// --------------------------------
//    CONFIRM AUTH CODE
// --------------------------------

export function confirmCode(codeInput) {
  return (dispatch, getState) => {

    const user = getState().user
    const app = getState().app
    console.log('user in confirm code')
    if(!user.displayName) {alert('ASDFSADF'); return}

    const credential = firebase.auth.PhoneAuthProvider.credential(app.verificationId, codeInput)

    if(app.shouldSignIn)
      dispatch(signIn(credential))
    else
      dispatch(linkUser(credential))

    // dispatch(checkForInvitesByPhoneNumber(user.phoneNumber)) // see if anyone invited this user
  }
}


function linkUser(credential) {
  return (dispatch, getState) => {
    // console.log('linkUser')
    firebase.auth().currentUser.linkWithCredential(credential)
      .then((firebaseUser) => {
        // console.log('linkedUser')
        dispatch({ type: t.USERS_LINKED, user: firebaseUser })
        dispatch(createUserInFirestore())
    }, function(error) {
      dispatch({type: t.SET_APP_ERROR, error})
    });
  }
}
// This function works
function signIn(credential) {
  return (dispatch, getState) => {
    firebase.auth().signInWithCredential(credential)
      .catch(error => dispatch({type: t.SET_APP_ERROR, error}))
  }
}

// --------------------------------
//    DOES USER EXIST
//    See if a user already created an account w this phone
// --------------------------------
function shouldAppSignIn(phoneNumber) {
  return (dispatch, getState) => {

    let userFound = false

    usersRef.where("phoneNumber", "==", phoneNumber)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          userFound = doc
        });

        if(userFound !== false)
          dispatch({type: t.APP_SHOULD_SIGN_IN})
    })
    .catch(function(error) {
        dispatch({type: t.SET_APP_ERROR, error})
    });
  }
}

// --------------------------------
//    RESET PHONE NUMBER
//    So the user can try getting a different code
// --------------------------------

export function resetPhoneNumber(phoneNumber) {
  return (dispatch, getState) => {
    dispatch({type: t.RESET_PHONE })
  }
}



// --------------------------------
//    NOTIFICATION PERMISSION
// --------------------------------

export function checkNotificationPermission() {
  return dispatch => {
    Permissions.check('notification')
      .then(response => {
        // console.warn('check',response)
        dispatch({ type: t.SET_NOTIFICATION_PERMISSION, response})
      })
  }
}

export function requestNotificationPermission() {
  return dispatch => {
    firebase.messaging().requestPermissions()
      .then((response)=> {
        // console.warn('response: ',response)
        dispatch(checkNotificationPermission())
      })
      .catch((error)=>console.warn('notification permission rejected',error));
  }
}

// --------------------------------
//    UPDATE USER IN FIRESTORE
// --------------------------------

function updateUser(data) {
  return (dispatch, getState) => {
    const user = getState().user
    if(!user.uid) {
      alert('No UID, something is terribly wrong')
    } else {
      firebase.firestore().collection("users").doc(user.uid).update(data)
        .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) )
    }
  }
}



// --------------------------------
//    SIGN OUT
// --------------------------------

export function signOut() {
  return dispatch => {

    firebase.auth().signOut().then(() => {
      dispatch({type: t.USER_SIGNED_OUT})
      dispatch({type: 'PURGE_DATA'}) // resets state to undefined
      // Actions.replace('LoggedOut')
    })
    .catch(error =>  dispatch({type: t.SET_APP_ERROR, error })  );
  }
}
