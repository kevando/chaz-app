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

import { recsRef, friendsRef } from '../../config/firebase'


export function addFriend(friend) {
  return(dispatch,getState) => {
    friend.owner = getState().user.uid // add friend owner

    friendsRef.add(friend)
    .then(docRef => {
      console.log('friend saved',friend)
      const newFriend = {
        ...friend,
        id: docRef.id
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
// Called from FriendView
// check if phone# is in db
// if not: save # to friend obj, save an invite obj, open imsg
// if found: save # and uid to db,

export function sendInvite(friend, phoneNumber) {
  // console.log('sendInvite', phoneNumber)


  return (dispatch, getState) => {
    const user = getState().user
    // See if phone# exists for a user
    usersRef.where("phoneNumber", "==", phoneNumber)
      .get()
      .then(querySnapshot => {
        let userWithPhoneNumber = null
        querySnapshot.forEach(doc =>  userWithPhoneNumber = doc.data() )

        if(!userWithPhoneNumber) {

          // no user found, lets save this phone# to the friend obj for later
          dispatch(updateFriend(friend,{phoneNumber,invitedAt: Date.now()}))

          // create an invite obj, not sure how im going to use this yet
          dispatch(createInvite(user,friend))

          // now open imessage
          text(phoneNumber, 'Hey, check out this new app called chaz')

          dispatch({type: SET_APP_STATUS, status: 'Sending invite'})
        } else {
          // user does exist w that phonenumber,
          // update friend w phonenumber and uid. uid assumes we want to make a connection
          // which again, not sure how i want to do connections just yet
          dispatch(assignUserToFriend(userWithPhoneNumber,friend))
          // alert('we found the user! and we added him as ur friend')
          dispatch({type: SET_APP_STATUS, status: 'Found the user!'})
          // dispatch({type: SET_APP_STATUS, status: 'Found the user! for sure'})

        }
      })
      .catch(error => dispatch({type: SET_APP_ERROR, error}) )
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


export function assignUserToFriend(user,friend) {

  // Query for uid based on username
  // this will actually happen in the RecView container
  return (dispatch, getState) => {
    const myUsername = getState().user.username
      // ok now that we have the user id, lets update the friend object
      friendsRef.doc(friend.id).update({uid:user.uid})
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
