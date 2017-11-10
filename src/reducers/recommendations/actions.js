import firebase from 'react-native-firebase';
import * as t from '../actionTypes';

import { recsRef, usersRef, messagesRef, addMessage } from '../../config/firebase'

// ----------------------------------------------------
//    SET INITIAL REC DATA
// ----------------------------------------------------

export const initNewRec = (payload) => (dispatch) =>
  new Promise(function(resolve,reject) {
    let cb = dispatch({ type: t.INIT_REC, payload })
    resolve(cb)
  })


export function setTitle(title) {
  return { type: t.SET_TITLE, title }
}


// ----------------------------------------------------
//    SEARCH FOR OPEN REC INVITES
//    HelloContainer,
// ----------------------------------------------------

export const fetchInvites = (This,That) => (dispatch, getState) =>
  new Promise(function(resolve, reject) {
    let myInvites = []
    // let q = name ? ["to.name", "==", name.toLowerCase()] : ["to.phoneNumber", "==", phoneNumber]

    recsRef.where("status", "==", "open").where(This, "==", That).get().then(querySnapshot => {
    // recsRef.where("status", "==", "open").where("to.name", "==", name.toLowerCase()).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.warn('found an invite!!!')
          myInvites.push({...doc.data(),id: doc.id})
          // recsRef.doc(doc.id).update({status: 'accepted', acceptedAt: Date.now()}) // close this invite otherwise it can get triggered again
        })
        resolve(myInvites)
      })
  })



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
    // console.log('saveRec')
    const unfinished = getState().recommendations.unfinished
    const user = getState().user

    const newRec = {...unfinished, createdBy: user.uid }

    recsRef.add(newRec)
      .then(docRef => {
        // console.log('newRec saved')
        if(unfinished.from.uid) { // then I am saving a rec FROM a live user, notify them
          addMessage(unfinished.from.uid,`Hey dingbat, ${user.displayName} just saved something to their chaz with your name on it`) // disabled for now @todo
        }
        if(unfinished.to.uid) { // then I am saving a rec TO a live user, notify them
          // @todo bad code. bad way to organize rec data
          addMessage(unfinished.to.uid,`** Incoming transmission ** Front Page News ** ${user.displayName} just sent you a recommendation...`) // disabled for now @todo
        }

        resolve(newRec)
      })
      .catch(error => console.warn("Error adding document: ", error) )
  }) // Promise



// ----------------------------------------------------
//   ACCEPT INVITAIOTIN
// might beover kill for its own fucntion
// ----------------------------------------------------
export const acceptInvitationRedux = (rec,friend) => (dispatch, getState) =>

  new Promise(function(resolve,reject) {
    const user = getState().user
    console.log('rec',rec)
    console.log('friued',friend)

    recsRef.doc(rec.id).update({
      to: {
        ...rec.to,
        uid: user.uid,
      },
      from: {
        ...rec.from,
        ...friend,
      },
      status: 'accepted',
      acceptedAt: Date.now(),
    })
      .then(docRef => {
        const updatedRec = {...docRef.data(),id: docRef.id}
        resolve(updatedRec)
    })
    .catch(error => reject(error))
  }) // Promise


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
