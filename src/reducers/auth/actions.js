import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import * as t from '../actionTypes'
import { initializeApp } from '../app/actions'
const Auth = firebase.auth()


// --------------------------------
//    SIGN OUT
// --------------------------------

export function signOut(redirect) {
  return (dispatch, getState) => {
    console.log('SIGN OUT')
    Auth.signOut().then(() => {
      dispatch({type: t.USER_SIGNED_OUT})
      dispatch({type: 'PURGE_DATA'}) // resets state to undefined
      Actions.replace('LoggedOut')
      // initializeApp()
    })
  }
}
