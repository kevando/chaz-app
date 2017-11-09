import firebase from 'react-native-firebase';
import { text } from 'react-native-communications'; // might not want this in redux

import * as t from '../actionTypes'

import { recsRef, friendsRef, usersRef, messagesRef} from '../../config/firebase'
import { initNewRec } from '../recommendations/actions'

// ----------------------------------------------------
//   Save new friend to firestore
// ----------------------------------------------------
export const addFriend = ({name,uid}) => (dispatch, getState) =>

  new Promise(function(resolve,reject) {

    if(!name) { return reject('no friendName')}

    let friend = {
      name: name.toLowerCase(),
      owner: getState().user.uid,
      createdAt: Date.now(),
      uid,
    }

    friendsRef.add(friend)
      .then(docRef => {
        friend.id = docRef.id
        resolve(friend)
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

    const friendWithPhone = {...friend,phoneNumber}
    dispatch(createInvite(user,friendWithPhone))

    // now open imessage
    text(phoneNumber, 'Hey, check out this new app called chaz http://chaz.co/i')
  }
}


// ----------------------------------------------------
//   Combine friends. called when users connect
// ----------------------------------------------------

export function deleteFriend(friend) {
  return dispatch => {
    friendsRef.doc(friend.id).delete(friend.id)
      .catch(error =>  dispatch({type: t.SET_APP_ERROR, error}) );
  }
}

export const updateFriend = (friend,data) => (dispatch, getState) =>

  new Promise(function(resolve,reject) {
      console.log(friend)
      console.log(data)

    friendsRef.doc(friend.id).update(data)
      .then(friend => resolve(friend))
      .catch(error =>  resolve(error) );

  }) // Promise



// ----------------------------------------------------
//   Add new rec thats an invite and update the user object
// ----------------------------------------------------
export const createInvite = (user,friend) => (dispatch, getState) =>

  new Promise(function(resolve, reject) {
    console.log('invite',friend)
    console.log('invite',user)
    const recInvite = {
      from: {uid: user.uid, displayName: user.displayName},
      to: friend,
      status: 'open',
      type: 'invite',
      invitedAt: Date.now(),
      createdAt: Date.now(),
      category: 'app',
      title: 'chaz',
      createdBy: user.uid
    }
    dispatch(initNewRec(recInvite).then(
      recsRef.add(recInvite)
        .then(docRef => {
          // Then update friend with recInvite data
          dispatch(updateFriend(friend,{recInviteId: docRef.id, searchResults: 'invitation sent',phoneNumber: friend.phoneNumber,invitedAt: Date.now()}))

          // resolve(docRef)
        })
        .catch(error => console.warn("Error adding document: ", error) )
    ))


  });


// ----------------------------------------------------
//
// ----------------------------------------------------
export function assignUserToFriend(friend) {

  // console.log('assign user')


  return (dispatch, getState) => {
    console.log('assignUserToFriend',friend)
    const user = getState().user
      // ok now that we have the user id, lets update the friend object
      friendsRef.doc(friend.id).update({uid:friend.found.uid, found: null, searchResults: 'Found and connected',})

        // @todo
        // this should probably eventually become its own firebase function listener
        .then( () =>  addMessage(friend.found.uid,`Hey Dingo, ${user.displayName} just added you on chaz`) )

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

  // changing this to remove friend obj
  return (dispatch, getState) => {
    console.log('assignFriendToUser',newFriend)

    friendsRef.add({
      owner: newFriend.uid,
      uid: getState().user.uid,
      displayName: getState().user.displayName,
      friendshipStatus: 'pending',
      phoneNumber: getState().user.phoneNumber,
      createdAt: Date.now(),
    }).catch(error => dispatch({type: t.SET_APP_ERROR, error}))
  }
}
// ----------------------------------------------------

function addMessage(uid,body) {
  usersRef.doc(uid).get().then(function(user) {
    if (user.exists) {
        // console.log("user data:", user.data());
        var token = user.data().token
        var payload = {
          notification: {
            // title: 'new rec given to you',
            body,
          }
        }
        messagesRef.add({token,payload})
    } else {
        console.warn("No such user!");
    }
})

}
