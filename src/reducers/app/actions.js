const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
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
} from '../actionTypes';
import { listenForRecs } from '../recommendations/actions'
import { listenForFriends } from '../friends/actions'
import { setUserToken } from '../user/actions'

export function initializeApp() {
  return (dispatch, getState) => {

    // We may want to do certain things if the app is opened from a message
    // currently getInitialNotification isnt working
    dispatch(handleNotifications())

    // Kick off auth listener to handle updating user object
    // This will fire every time the app loads no matter what
    firebase.auth().onAuthStateChanged(function(user) {

      // Add user data to redux (registered or anon)
      // Fire off event listeners
      if (user) {

        dispatch({ type: USER_SIGNED_IN, user })

        // Start some Firestore data listeners to handle ALL data
        // Note: this may become an issue if user is without internet
        dispatch(listenForRecs(user.uid))
        dispatch(listenForFriends(user.uid))

      } else {

        // No user is signed in. so lets authenticate anon
        firebase.auth().signInAnonymously()
      }
    });

    dispatch(setToken())
  }
}

function handleNotifications() {
  return dispatch => {

    const messaging = firebase.messaging()

    messaging.onMessage( (notif) => {
      // console.warn('onMessage!!')
      // console.log(notif)
      dispatch({type: SET_APP_STATUS, status: 'OnMessage fired'})
    })

    // @todo
    // this is bugging right now per github issues threads

    messaging.getInitialNotification().then(notif=>{
      // console.warn('getInitialNotification')
      // console.log(notif)
      if(!notif) {
        dispatch({type: SET_APP_ERROR, error: {message: 'InitialNotification is empty'} })
      } else {
        // this apperantly works. not sure what the notif object is like
        // and not too sure how to redirect the user to a different page
        dispatch({type: SET_APP_STATUS, status: 'Initial Notification is not empty!'})
      }
    });
  }
}

function setToken() {
  return (dispatch, getState) => {
    const user = getState().user
    const app = getState().app


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


export function signInLink(phoneNumber) {
  return dispatch => {
    dispatch({type: SIGN_IN_ATTEMPT })

    const formatedNumber = `+1${phoneNumber}`

    firebase.auth().signInWithPhoneNumber(formatedNumber)
      .then(confirmResult => dispatch({type: SIGN_IN_CONFIRM_RESULT, confirmResult, formatedNumber }) )
      .catch(error =>  dispatch({type: SIGN_IN_ERROR, status: error.message })  );


  }
}


export function confirmCode(codeInput) {
  return (dispatch, getState) => {

    dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'attempting'})
    const confirmResult = getState().app.confirmResult

    var credential = firebase.auth.PhoneAuthProvider.credential(confirmResult._verificationId, codeInput);


    firebase.auth().currentUser.linkWithCredential(credential)
    .then((confirmationResult) => {
      console.log('confirmationResult',confirmationResult)
      dispatch({type: CONFIRM_CODE_SUCCESS, status: 'confirmationResult success'})
      // At this point SMS is sent. Ask user for code.
      // let code = window.prompt('Please enter the 6 digit code');
      // return confirmationResult.confirm(code);
    })

    .then((firebaseUser) => {
      console.log("Anonymous account successfully upgraded", firebaseUser);
      dispatch({type: CONFIRM_CODE_SUCCESS, status: 'Anonymous account successfully upgraded'})
      // dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'confirmationResult'})
      // not sure why authStateChanged isnt called
      // so calling this manually
      // console.log('usernane')

    }, function(error) {
      // cb({error:'Error: '+error})
      console.log("Error upgrading anonymous account", error);
      dispatch({type: CONFIRM_CODE_ERROR, error})


    });


    // if (confirmResult && codeInput.length) {
    //   confirmResult.confirm(codeInput)
    //     .then((user) => {
    //       dispatch({type: CONFIRM_CODE_SUCCESS})
    //     })
    //     .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` , status: 'error confirm error'}));
    // }

  }
}

export function logoutUser() {
  console.log('logout?')
  return dispatch => {
    console.log('logout?????')
    firebase.auth().signOut().then(function() {
      console.log('signout successful')
      dispatch({type: USER_SIGNED_OUT})
    }).catch(function(error) {
      console.log('signout err',error)
      // An error happened.
    });
  }
}



export function setNotificationPermission(response) {
  return { type: SET_NOTIFICATION_PERMISSION, response}
}


// Temp for dev
export function devLogin() {

  return dispatch => {
    const email = 'kevin@kevaid.com'
    const password = '12345678'
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      console.log('login!',error)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
}
