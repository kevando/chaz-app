import firebase from 'react-native-firebase';
// var uuid = require('react-native-uuid');
import {
  SET_TITLE,
  // SET_FRIEND_ID,
  SAVE_RECOMMENDATION_SUCCESS,
  SET_REMINDER,
  DELETE_RECOMMENDATION,
  SET_STATUS,
  SET_FILTER,
  SET_GRADE,
  UPDATE_RECOMMENDATION,
  REFRESH_MY_RECS,
  REFRESH_GIVEN_RECS,
  SET_REC_TO,
  INIT_REC,
} from '../actionTypes';

import * as t from '../actionTypes';

import { recsRef, usersRef, messagesRef } from '../../config/firebase'


export const testPromise = () => (dispatch, getState) =>

  new Promise(function(resolve, reject) {
    console.log('tt')
    dispatch({
      type: 'SET_SAVING',
      saving: true
    });
  });
export const initNewRec = (payload) => (dispatch) =>
  new Promise(function(resolve,reject) {
    dispatch({ type: INIT_REC, payload })
    resolve()
  })


export function setTitle(title) {
  return { type: SET_TITLE, title }
}

// ----------------------------------------------------
//   Save new friend to firestore
// ----------------------------------------------------


// new
export const setFriend = (friend) => (dispatch, getState) =>

  new Promise(function(resolve, reject) {

    let dude = dispatch({
      type: t.SET_FRIEND,
      friend
    });
    resolve(dude) // testing how to return dispatches
  });

// ----------------------------------------------------


// ----------------------------------------------------
//   Save new rec to fire store
// ----------------------------------------------------
export const saveRec = () => (dispatch, getState) =>

  new Promise(function(resolve,reject) {
    console.log('saveRec')
    const unfinished = getState().recommendations.unfinished
    const user = getState().user

    const newRec = {...unfinished, status: 'new', createdBy: user.uid }

    recsRef.add(newRec)
      .then(docRef => {
        console.log('newRec saved')
        if(unfinished.from.uid) { // then I am saving a rec FROM a live user, notify them
          addMessage(unfinished.from.uid,`Hey dingbat, ${user.displayName} saved something to their chaz with your name on it`) // disabled for now @todo
        }
        if(unfinished.to_name) { // then I am saving a rec TO a live user, notify them
          // @todo bad code. bad way to organize rec data
          addMessage(unfinished.to,`Incoming message. ** Front Page News ** ${user.displayName} sent you something...`) // disabled for now @todo
        }

        // dispatch({ type: t.SAVE_RECOMMENDATION_SUCCESS}) // might cause issue
        resolve(newRec)
      })
      .catch(error => console.warn("Error adding document: ", error) )
  }) // Promise


// // ----------------------------------------------------

function addMessage(uid,body) {

  usersRef.doc(uid).get().then(function(user) {
    if (user.exists) {
        // console.log("user data:", user.data());
        var token = user.data().token
        var payload = {
          notification: {
            // title: 'new rec given to you',
            body
          }
        }
        messagesRef.add({token,payload})
    } else {
        console.warn("No such user to send message to");
    }
})

}



export function updateRecommendation(rec) {
  // DEV
  // return { type: UPDATE_RECOMMENDATION, rec }

  return(dispatch,getState) => {
    rec.updatedAt = Date.now()
    recsRef.doc(rec.id).update(rec)
    // dispatch({ type: UPDATE_RECOMMENDATION, rec })
  }
}

export function setReminder(recId,reminderDate) {
  return { type: SET_REMINDER, recId, reminderDate }
}

export function deleteRecommendation(rec) {
  return(dispatch,getState) => {
    recsRef.doc(rec.id).delete()
    // dispatch({ type: DELETE_RECOMMENDATION, rec }) consider DELETE_RECOMMENDATION_SUCCESS
  }
}



export function setStatus(recId,status) {
  return { type: SET_STATUS, recId, status }
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function setGrade(recId,grade) {
  return { type: SET_GRADE, recId, grade }
}

// Once a user is matched to a friend, update all existing recs that have that friend
// with the new user in the from field
export function assignUserToRecs(user,friend) {
  console.log('assignUserToRecs')

  return dispatch => {
    recsRef.where("from.id", "==", friend.id)
    // or recs that ive given
      .onSnapshot(function(querySnapshot) {
          // var myFriends = [];
          // console.log('friend listner fired!')
          querySnapshot.forEach(function(doc) {
              // console.log('recs listner',doc.data())
              recsRef.doc(doc.id).update({from: user.uid})
          });
      });
  }
  //

}
