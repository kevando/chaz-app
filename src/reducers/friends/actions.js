import firebase from 'react-native-firebase';
import { text } from 'react-native-communications'; // might not want this in redux
import {
  SAVE_FRIEND,
  SET_FRIEND_ID,
  REFRESH_FRIENDS,
  SET_APP_STATUS,
  SET_APP_ERROR,
} from '../actionTypes';

import * as t from '../actionTypes'

import { recsRef, friendsRef, usersRef } from '../../config/firebase'


export function addFriend(friend) {
  // console.log('addFriend?')
  return(dispatch,getState) => {
    friend.owner = getState().user.uid // add friend owner
    friend.createdAt = Date.now()
    // console.log('addFriend?')
    friendsRef.add(friend)
    .then(docRef => {
      // console.log('friend saved',friend)
      const newFriend = {
        ...friend,
        id: docRef.id,

      }
      dispatch({ type: SAVE_FRIEND, friend: newFriend })
      dispatch({ type: SET_FRIEND_ID, friendId: docRef.id }) // unfinished
    })
  }
}


export function saveFriend(friend) {
  return { type: SAVE_FRIEND, friend }
}


// ----------------------------------------------------
// Called from Invite
// check if phone# is in db
// if not: save # to friend obj, save an invite obj, open imsg
// if found: save # and uid to db,

export function searchUsers(friend,phoneNumber) {
  console.log('search users',phoneNumber)
  return (dispatch, getState) => {
    usersRef.where("phoneNumber", "==", phoneNumber)
      .get()
      .then(querySnapshot => {
        let userWithPhoneNumber = null
        querySnapshot.forEach(doc =>  userWithPhoneNumber = doc.data() )

          if(!userWithPhoneNumber) {

            // no user found,
            dispatch(updateFriend(friend,{searchResults: 'no user found'}))
          } else {
            // user found!
            dispatch(updateFriend(friend,{searchResults: 'user found',found: userWithPhoneNumber}))
          }
      })
  }
}

export function sendInvite(friend, phoneNumber) {

  return (dispatch, getState) => {
    const user = getState().user


    // no user found, lets save this phone# to the friend obj for later
    dispatch(updateFriend(friend,{searchResults: 'invitation sent',phoneNumber,invitedAt: Date.now()}))

    // create an invite obj, not sure how im going to use this yet
    dispatch(createInvite(user,friend))

    // now open imessage
    text(phoneNumber, 'Hey, check out this new app called chaz')


  }
}


function updateFriend(friend,data) {
  return dispatch => {
    friendsRef.doc(friend.id).update(data)
      .catch(error =>  dispatch({type: SET_APP_ERROR, error}) );
  }
}

function createInvite(user,friend) {
  return dispatch => {
    const inviteObject = {
      user,
      friend,
      status: 'open',
      invitedAt: Date.now()
    }
    firebase.firestore().collection("invites").add(inviteObject)
      .catch(error => dispatch({type: SET_APP_ERROR, error}))
  }
}


export function assignUserToFriend(friend) {

  console.log('assign user')

  // Query for uid based on username
  // this will actually happen in the RecView container
  return (dispatch, getState) => {
    // const myUsername = getState().user.username
      // ok now that we have the user id, lets update the friend object
      friendsRef.doc(friend.id).update({uid:friend.found.uid, found: null, searchResults: 'Found and connected',})
        // tmp not sending messages for now
        // .then( () =>  addMessage(user.uid,myUsername) )
        .catch(error => dispatch({type: SET_APP_ERROR, error}))
  }
}

// ----------------------------------------------------

function addMessage(uid,username) {
  firebase.firestore().collection("users").doc(uid).get().then(function(user) {
    if (user.exists) {
        // console.log("user data:", user.data());
        var token = user.data().token
        var payload = {
          notification: {
            // title: 'new rec given to you',
            body: username + ' added you on chaz'
          }
        }
        firebase.firestore().collection("messages").add({token,payload})
    } else {
        console.log("No such user!");
    }
})

}
