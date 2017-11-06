const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
  USER_SIGNED_IN,
  SIGN_IN_CONFIRM_RESULT,
  SIGN_IN_ERROR,
  SIGN_IN_ATTEMPT,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  CONFIRM_CODE_ATTEMPT,
  SET_TOKEN,
  SET_APP_STATUS,
  SET_APP_ERROR,
  USER_SIGNED_OUT,
  USERS_LINKED,
  SET_USER_PHONE,
  USER_IS_AUTHENTICATED,
} from '../actionTypes';
import * as t from '../actionTypes'

import { listenForAuthChanges } from '../../config/firebase'
import { createUserInFirestore } from '../user/actions'



// --------------------------------
//    INIT APP
// --------------------------------

export function initializeApp() {
  return (dispatch, getState) => {
    const app = getState().app

    // Kick everything off
    dispatch(listenForAuthChanges())

    if(!app.token)
      dispatch(setToken())

    if(!app.notificationPermission)
      dispatch(checkNotificationPermission())
  }
}

// --------------------------------
//    HANDLE NOTIFICATIONS
// --------------------------------
//
// function handleNotifications() {
//   return dispatch => {
//
//     const messaging = firebase.messaging()
//
//     messaging.onMessage( (notif) => {
//       // console.warn('onMessage!!')
//       // console.log(notif)
//       dispatch({type: SET_APP_STATUS, status: 'OnMessage fired'})
//     })
//
//     // @todo
//     // this is bugging right now per github issues threads
//
//     messaging.getInitialNotification().then(notif=>{
//       // console.warn('getInitialNotification')
//       // console.log(notif)
//       if(!notif) {
//         // turning this off cause its annoying
//         // dispatch({type: SET_APP_ERROR, error: {message: 'InitialNotification is empty'} })
//       } else {
//         // this apperantly works. not sure what the notif object is like
//         // and not too sure how to redirect the user to a different page
//         dispatch({type: SET_APP_STATUS, status: 'Initial Notification is not empty!'})
//       }
//     });
//   }
// }

// --------------------------------
//    GET FCM TOKEN
// --------------------------------

function setToken() {
  return (dispatch, getState) => {
    const user = getState().user
    const app = getState().app

    // console.log('setToken',app)
    // @todo might be a bug here
    if(!app.token) {
    // if(true) {
      firebase.messaging().getToken().then(token => {

        var userRef = firebase.firestore().collection("users").doc(user.uid)

        userRef.get().then(userDoc => {
          if(userDoc.exists){
            // simply update the doc
            userRef.update({ token }).then(() => dispatch({type: SET_APP_STATUS, status: 'UPDATED user to database'}))
          } else {
            // need to create user
            userRef.set({
              token,
              createdAt: Date.now(),
              uid: user.uid,
              // phoneNumber: user.phoneNumber
            }).then(() => dispatch({type: SET_APP_STATUS, status: 'ADDED user to database'}))
          }
        })

        dispatch({type: SET_TOKEN, token})
        dispatch({type: SET_APP_STATUS, status: 'token set!'})
      })
    }
  }
}




// --------------------------------
//    VERIFY PHONE NUMBER
// --------------------------------

export function verifyPhone(phoneNumber) {
// console.warn('callb')
  return (dispatch, getState) => {
    // Following code is from https://github.com/invertase/react-native-firebase/issues/119

    //
    const formatedNumber = `+1${phoneNumber}`

    firebase.auth().verifyPhoneNumber(formatedNumber)
      .then(phoneAuthSnapshot => {

        const { verificationId } = phoneAuthSnapshot;

        dispatch({type: t.SIGN_IN_CONFIRM_RESULT, verificationId, formatedNumber })
        // dispatch({type: SET_APP_STATUS, status: 'code sent!'})
        dispatch({type: t.SET_USER_DATA, data: {phoneNumber: phoneNumber} })

      })
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error })  );


  }
}



// --------------------------------
//    CONFIRM AUTH CODE
//    @todo need to change this to actually handle users coming back and simply logging in
// --------------------------------

export function confirmCode(codeInput) {
  return (dispatch, getState) => {

    const verificationId =  getState().app.verificationId //getState().app.verificationId
    const user = getState().user
    !user.name && console.warn('oh no, no name saved',user)
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput)

    // this works, but user comes out anon still
    // @todo need to fix
    firebase.auth().currentUser.linkWithCredential(credential)

    .then((firebaseUser) => {
      console.warn("Anonymous account successfully upgraded", firebaseUser.displayName);
      console.warn("Anonymous account successfully upgraded", firebaseUser.providerData);
      // dispatch({type: SET_APP_STATUS, status: 'Anonymous account successfully upgraded, dispatch USERS_LINKED'})
      dispatch({ type: t.USERS_LINKED, user: firebaseUser })

      // now update user displayName because isAnon isnt working right now
      firebaseUser.updateProfile({
        displayName: user.name || 'BAD ERROR',
      }).catch(error =>  dispatch({type: t.SET_APP_ERROR, error })  );


      // Now update user data in Firestore
      dispatch(createUserInFirestore())

    }, function(error) {
      // cb({error:'Error: '+error})
      dispatch({type: t.SET_APP_ERROR, error})
    });

  }
}

// --------------------------------
//    SIGN OUT
// --------------------------------

export function signOut() {
  return dispatch => {

    firebase.auth().signOut().then(() => {
      dispatch({type: USER_SIGNED_OUT})
      dispatch({type: 'PURGE_DATA'}) // resets state to undefined
      Actions.replace('LoggedOut')
    })
    .catch(error =>  dispatch({type: SET_APP_ERROR, error })  );
  }
}



// --------------------------------
//    NOTIFICATION PERMISSION
// --------------------------------

export function checkNotificationPermission() {
  return dispatch => {
    Permissions.check('notification')
      .then(response => {
        console.log('check',response)
        dispatch({ type: t.SET_NOTIFICATION_PERMISSION, response})
      })
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
        .then(() =>  dispatch({type: SET_APP_STATUS, status: 'Updated User in firestore'}) )
        .catch(error =>  dispatch({type: SET_APP_ERROR, error}) )
    }
  }
}







// --------------------------------------------------------------
// Temp for dev
export function loginAsTest() {
  console.log('loginAsTest')
  const email = 'test@kevaid.com'
  const password = '12345678'

  return dispatch => {
    console.log('loginAsTest d')

    firebase.auth().signInWithEmailAndPassword(email, password)


    .then(dispatch(createUserInFirestore()))

    .catch(function(error) {
      // Handle Errors here.
      dispatch({type: SET_APP_ERROR, error})
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
}

// --------------------------------------------------------------
// Temp for dev
export function registerAsTest() {
  // This will link the anon account w a new account
  const email = 'test@kevaid.com'
  const password = '12345678'

  console.log('registerAsTest')

  return dispatch => {
    console.log('registerAsTest dispatched')



    var credential = firebase.auth.EmailAuthProvider.credential(email, password);

        firebase.auth().currentUser.linkWithCredential(credential).then((firebaseUser) => {
          console.log("Anonymous account successfully upgraded", firebaseUser);
          console.log("firebaseUser._user", firebaseUser._user);
          console.warn("Anonymous account successfully upgraded");

          // Need to be careful because authStateChanged isnt fired
          // by linking accounts
          // so we need to call some of that manually

          // const user = {...firebaseUser._user}
          dispatch({ type: USERS_LINKED, user: firebaseUser._user })


          // Now lets add the info to the user doc
          // this times its email, next time its phone

          dispatch(updateUser({email, linkedAt: Date.now() }))

        }, function(error) {
          console.warn("Error upgrading anonymous account", error);
          console.log('code?',error.code)
          dispatch({type: SET_APP_ERROR, error})
          // if we reach here, most likely the account already exists, so lets try to just login
          dispatch(loginAsTest())
        });

  }
}
