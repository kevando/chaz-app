import firebase from 'react-native-firebase';
import { text } from 'react-native-communications'; // might not want this in redux

import * as t from '../actionTypes'

import { recsRef, friendsRef, usersRef, invitesRef, } from '../../config/firebase'


// ----------------------------------------------------
//   Save new friend to firestore
// ----------------------------------------------------
export const addFriend = (friendName) => (dispatch, getState) =>

  new Promise(function(resolve,reject) {

    if(!friendName) { return reject('no friendName')}

    let friend = {
      name: friendName,
      owner: getState().user.uid,
      createdAt: Date.now(),
    }

    friendsRef.add(friend)
      .then(docRef => {
        friend.id = docRef.id
        resolve(friend)
      // dispatch({ type: t.SAVE_FRIEND, friend: newFriend })
      // dispatch({ type: t.SET_FRIEND_ID, friendId: docRef.id }) // unfinished
    })
    .catch(error => reject(error))
  }) // Promise



export function saveFriend(friend) {
  return { type: t.SAVE_FRIEND, friend }
}


// ----------------------------------------------------
// Called from Invite
// check if phone# is in db
// if not: save # to friend obj, save an invite obj, open imsg
// if found: save # and uid to db,

export function searchUsers(friend,phoneNumber) {
  // console.log('search users',phoneNumber)
  return (dispatch, getState) => {
    usersRef.where("phoneNumber", "==", phoneNumber)
      .get()
      .then(querySnapshot => {
        let userWithPhoneNumber = null
        querySnapshot.forEach(doc =>  userWithPhoneNumber = doc.data() )

          if(!userWithPhoneNumber) {

            // no user found,
            dispatch(updateFriend(friend,{searchResults: 'no user found', phoneNumber,searchedAt: Date.now()}))
          } else {
            // user found!
            dispatch(updateFriend(friend,{searchResults: 'user found',found: userWithPhoneNumber, phoneNumber}))
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
    // @todo this is essential a rec for chaz
    dispatch(createInvite(user,friend))

    // now open imessage
    text(phoneNumber, 'Hey, check out this new app called chaz')


  }
}


export function updateFriend(friend,data) {
  return dispatch => {
    friendsRef.doc(friend.id).update(data)
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) );
  }
}

function createInvite(user,friend) {
  return dispatch => {
    const inviteObject = {
      from: user,
      to: friend,
      status: 'open',
      invitedAt: Date.now()
    }
    invitesRef.add(inviteObject)
      .catch(error => dispatch({type: t.SET_APP_ERROR, error}))
  }
}


export function assignUserToFriend(friend) {

  // console.log('assign user')


  return (dispatch, getState) => {
    // const myUsername = getState().user.username
      // ok now that we have the user id, lets update the friend object
      friendsRef.doc(friend.id).update({uid:friend.found.uid, found: null, searchResults: 'Found and connected',})

        // tmp not sending messages for now
        // .then( () =>  addMessage(user.uid,myUsername) )

        // Now we also want to connect this user to their new friend
        // Maybe that user doesnt want this, but for now we are forcing it
        .then(dispatch(assignFriendToUser(friend.found)))

        .catch(error => dispatch({type: t.SET_APP_ERROR, error}))
  }
}


export function assignFriendToUser(newFriend) {
  // sorta confusing, but if our user connects to a new friend
  // lets also add THIS USER to the new friends friend list
  // they may or may not already be there,
  // adding THIS user as a new friend with friendship pending and deal w it later

  return (dispatch, getState) => {

    friendsRef.add({
      owner: newFriend.uid,
      displayName: getState().user.displayName,
      friendshipStatus: 'pending',
      phoneNumber: getState().user.phoneNumber,
      createdAt: Date.now(),
    }).catch(error => dispatch({type: t.SET_APP_ERROR, error}))
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
