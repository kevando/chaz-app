
import * as t from '../actionTypes'
import firebase from 'react-native-firebase'

import { usersRef, recsRef } from '../../config/firebase'
import { addFriend } from '../friends/actions'

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
//    SEE IF INVITE EXISTS
// --------------------------------

export function checkForInvitesByName(name) {
  return (dispatch, getState) => {
    let myInvites = []

    recsRef
      .where("type", "==", "invite")
      .where("to.name", "==", name.toLowerCase())
      .where("status", "==", "open")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          myInvites.push({...doc.data(),id: doc.id})
          dispatch(addFriend({name: doc.data().from.displayName,uid: doc.data().from.uid}))
          // set to = THIS user uid
        })

          dispatch({type: t.SET_USER_DATA, data: {myInvites} })

      })
  }
}
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
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) )
  }
}
