
import * as t from '../actionTypes'
import firebase from 'react-native-firebase'

import { usersRef, recsRef } from '../../config/firebase'
import { addFriend } from '../friends/actions'
import { setToken } from '../app/actions'

// --------------------------------
//    SET USER DATA IN REDUX
// --------------------------------
export const setUserData = (data) => (dispatch, getState) =>
  new Promise(function(resolve, reject) {
      dispatch({ type: t.SET_USER_DATA, data })
      resolve('first')
      resolve('second')
  })


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
export const createUserInFirestore = () => (dispatch, getState) =>
  new Promise(function(resolve, reject) {
    // console.warn('creating user')
    const user = getState().user
    let token = getState().app.token
    // console.warn('creating user 2')
    if(!user.displayName) {alert('!user.displayName');return reject('user.displayName is null')}
    // console.warn('creating user 3')
    if(!token) {
      token = setToken()
      alert('!app.token wow still happens')
    }
    // console.warn('creating user 4')

    if(!token) {
      alert('aaaand grabbing token still failed')
    }

    // console.warn('creating user 5')

    const initialData = {
      uid: user.uid,
      token: token,
      phoneNumber: user.phoneNumber,
      linkedAt: Date.now(),
      displayName: user.displayName,
    }

    usersRef.doc(user.uid).set(initialData)
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) )
  })
