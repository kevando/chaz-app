
import * as t from '../actionTypes'
import firebase from 'react-native-firebase'

import { usersRef } from '../../config/firebase'


// --------------------------------
//    SET USER DATA IN REDUX
// --------------------------------
export function setUserData(data) {
  return { type: t.SET_USER_DATA, data }
}


// --------------------------------
//    SET USER NAME TO FIREBASE USER
// --------------------------------
export const saveDisplayName = (displayName) => (dispatch, getState) =>
  new Promise(function(resolve, reject) {
    firebase.auth().currentUser.updateProfile({displayName})
      .then(response =>  {
        dispatch({type: t.SET_USER_DATA, data: {displayName}}) // because authchange doesnt fire
        resolve(response)
      })
      .catch(error =>  reject(error)  )
  });


// --------------------------------
//    CREATE USER IN FIRESTORE
// --------------------------------

export function createUserInFirestore() {
  return (dispatch, getState) => {

    const user = getState().user
    const app = getState().app

    if(!user.displayName) {console.warn('user.displayName is null')}

    const initialData = {
      uid: user.uid,
      token: app.token,
      phoneNumber: user.phoneNumber,
      linkedAt: Date.now(),
      displayName: user.displayName,
    }

    usersRef.doc(user.uid).set(initialData)
      .then(() =>  dispatch({type: t.SET_APP_STATUS, status: 'Updated User in firestore'}) )
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) )
  }
}
