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
  CONFIRM_CODE_ATTEMPT
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



export function signInLink(phoneNumber) {
  return dispatch => {
    dispatch({type: SIGN_IN_ATTEMPT })

    const formatedNumber = `+1${phoneNumber}`



    firebase.auth().signInWithPhoneNumber(formatedNumber)
      .then(confirmResult => dispatch({type: SIGN_IN_CONFIRM_RESULT, confirmResult, formatedNumber }) )
      .catch(error =>  dispatch({type: SIGN_IN_ERROR, status: error.message })  );

    // return
    // var credential = firebase.auth.PhoneAuthProvider.credential(email, password);

    // firebase.auth().currentUser.linkWithCredential(credential)
    // .then((confirmationResult) => {
    //   console.log('confirmationResult',confirmationResult)
    //   // At this point SMS is sent. Ask user for code.
    //   // let code = window.prompt('Please enter the 6 digit code');
    //   // return confirmationResult.confirm(code);
    // })
    //
    // .then((firebaseUser) => {
    //   console.log("Anonymous account successfully upgraded", firebaseUser);
    //   // not sure why authStateChanged isnt called
    //   // so calling this manually
    //   // console.log('usernane')
    //
    // }, function(error) {
    //   // cb({error:'Error: '+error})
    //   console.log("Error upgrading anonymous account", error);
    //
    //
    // });


    // firebase.auth().currentUser.linkWithPhoneNumber(formatedNumber)
    //   .then((confirmationResult) => {
    //     console.log('confirmationResult',confirmationResult)
    //     // At this point SMS is sent. Ask user for code.
    //     // let code = window.prompt('Please enter the 6 digit code');
    //     // return confirmationResult.confirm(code);
    //   })
    //   .then((result) => {
    //     // Phone credential now linked to current user.
    //     // User now can sign in with email/pass or phone.
    //     console.log('result',result)
    //   })
    //   .catch((error) => {
    //     console.log('error',error)
    //     // Error occurred.
    //   });



  }
}

export function signIn(phoneNumber) {
  return dispatch => {
    dispatch({type: SIGN_IN_ATTEMPT })

    const formatedNumber = `+1${phoneNumber}`

    // tmp
    // dispatch({type: SIGN_IN_CONFIRM_RESULT, confirmResult: ()=> alert('confirm result')})

    firebase.auth().signInWithPhoneNumber(formatedNumber)
      .then(confirmResult => dispatch({type: SIGN_IN_CONFIRM_RESULT, confirmResult }) )
      .catch(error =>  dispatch({type: SIGN_IN_ERROR, status: error.message })  );

  }
}

export function confirmCode(codeInput) {
  return (dispatch, getState) => {
    // console.log('confirmCode')
    dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'attempting'})
    const confirmResult = getState().app.confirmResult
    // const formatedNumber = getState().app.formatedNumber
    console.log('verfId',confirmResult.verificationId)
    console.log('_verfId',confirmResult._verificationId)
    var credential = firebase.auth.PhoneAuthProvider.credential(confirmResult._verificationId, codeInput);
    console.log('cred',credential)

    console.log('confirmResult',confirmResult)
    console.log('codeInput',codeInput)

    firebase.auth().currentUser.linkWithCredential(credential)
    .then((confirmationResult) => {
      console.log('confirmationResult',confirmationResult)
      dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'confirmationResult'})
      // At this point SMS is sent. Ask user for code.
      // let code = window.prompt('Please enter the 6 digit code');
      // return confirmationResult.confirm(code);
    })

    .then((firebaseUser) => {
      console.log("Anonymous account successfully upgraded", firebaseUser);
      dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'confirmationResult'})
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




export function setNotificationPermission(response) {
  return { type: SET_NOTIFICATION_PERMISSION, response}
}
