import firebase from 'react-native-firebase';
// var uuid = require('react-native-uuid');
import {
  SET_TITLE,
  SET_FRIEND_ID,
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

import { recsRef } from '../../config/firebase'

// const recsRef = firebase.firestore().collection("recommendations")


export const testPromise = () => (dispatch, getState) =>

  new Promise(function(resolve, reject) {
    console.log('tt')
    dispatch({
      type: 'SET_SAVING',
      saving: true
    });

    console.log('ttt')
    // // Function is expected to return a promise
    // callUpdateApi(todoId, isDone).then(updatedTodo => {
    //   dispatch({
    //     type: 'SET_SAVING',
    //     saving: false
    //   });
    //
    //   resolve(updatedTodo);
    // }).catch(error => {
    //   // TBD: Handle errors for Redux
    //
    //   reject(error);
    // })
  });
export const initNewRec = (payload) => (dispatch) => 
  new Promise(function(resolve,reject) {
    dispatch({ type: INIT_REC, payload })
  })


export function initNewRecc(payload) {
  return { type: INIT_REC, payload }
}

export function setTitle(title) {
  return { type: SET_TITLE, title }
}

export function setFriendId(friendId) {
  return { type: SET_FRIEND_ID, friendId }
}

// given
export function setRecTo(uid) {
  return { type: SET_REC_TO, uid }
}

export function addRecommendation() {
  return(dispatch,getState) => {
    const unfinished = getState().recommendations.unfinished
    const user = getState().user
    console.log('unfinished',unfinished)

    const newRec = {...unfinished, status: 'new', createdBy: user.uid }

    recsRef.add(newRec)
      .then(docRef => {
        // dispatch({ type: SAVE_RECOMMENDATION_SUCCESS})
        addMessage(unfinished,getState().user.username) // disabled for now
      })
      .catch(error => console.warn("Error adding document: ", error) )
  }
}


function addMessage(newRec,username) {
  // TMP DISABLONG FOR NOW
//   firebase.firestore().collection("users").doc(newRec.to).get().then(function(user) {
//     if (user.exists) {
//         // console.log("user data:", user.data());
//         var token = user.data().token
//         var payload = {
//           notification: {
//             // title: 'new rec given to you',
//             body: username + ' sent you a recommendation'
//           }
//         }
//         firebase.firestore().collection("messages").add({token,payload})
//     } else {
//         console.log("No such user!");
//     }
// })

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
    recsRef.where("friendId", "==", friend.id)
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
