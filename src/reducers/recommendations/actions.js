import firebase from 'react-native-firebase';
import _ from 'lodash'
import * as t from '../actionTypes';

import { recsRef, usersRef, messagesRef, addMessage } from '../../config/firebase'

// ----------------------------------------------------
//    SET INITIAL REC DATA
// ----------------------------------------------------

export const initNewRec = (payload) => (dispatch) =>
  new Promise(function(resolve,reject) {
    console.log('initnewRec',payload)
    let cb = dispatch({ type: t.INIT_REC, payload })
    console.log('initNewq ')
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
      }).catch(e => reject(e))
  })



// ----------------------------------------------------
//   Save new friend to firestore
// ----------------------------------------------------

// @todo
// Need to also check if friend.uid exists
// then i also need to add MY friend id
// But really, this indicates that my data is not set up very well
export const setFriend = (friend) => (dispatch, getState) =>

  new Promise(function(resolve, reject) {

    let dude = dispatch({
      type: t.SET_FRIEND,
      friend
    });
    resolve(dude) // testing how to return dispatches
  });



// ----------------------------------------------------
//   SAVE NEW DATA TO UNFINISHED REC
// ----------------------------------------------------


// new
export const setUnfinishedData = (data) => (dispatch, getState) =>

  new Promise(function(resolve, reject) {

    let dude = dispatch({
      type: t.SET_UNFINISHED_DATA,
      data,
    });
    resolve(dude) // testing how to return dispatches
  });



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
    console.warn('accepting invite')
    const user = getState().user

    // // Update Invitaiton Doc
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
        addMessage(rec.from.uid,`Hey jimbo jones, ${rec.to.name || rec.to.displayName} just accepted your chaz invite`)
    })
    .catch(error => reject(error))

    // Now go find all other recs where this user might be on and update them
    recsRef.where("from.id", "==", rec.to.id).get()
      .then(querySnapshot => {
        console.log('Found some recs to update bitch?')
        querySnapshot.forEach(doc => {

          console.log('Found some recs to update bitch!',doc.id)
          // console.log('Found some recs to update bitch!',user.uid)
          recsRef.doc(doc.id).update({"from.uid" : user.uid, "to.id": friend.id})
            .then(r=> resolve(rec)) // expects the rec to return
            .catch(e=> console.log(e))

        })
      })

  }) // Promise



// ----------------------------------------------------
//   ACCEPT ONLY OL REC
// ----------------------------------------------------

export const acceptRec = (rec) => (dispatch, getState) =>
// add friend id to from
// set status to accepted
  new Promise(function(resolve,reject) {
    // console.warn('accept Rec')
    const user = getState().user
    const friend = _.find(getState().friends,f => f.uid == rec.from.uid)

    console.log('friend',friend)
    if(!friend){return reject('no friend found')}

    // Update Rec Doc
    recsRef.doc(rec.id).update({
      status: 'accepted',
      "from.id" : friend.id,
      acceptedAt: Date.now(),
    }).then(r=> {
      addMessage(rec.from.uid,`Hey Buddy, ${rec.to.name || rec.to.displayName} just accepted your chaz rec`)
      resolve()
    })


  }) // Promise



// ----------------------------------------------------
//   UPDATE REC
// ----------------------------------------------------

export const updateRec = (id,data) => (dispatch, getState) =>

  new Promise(function(resolve,reject) {
    recsRef.doc(id).update( {...data, updatedAt: Date.now() } )
      .then(r => resolve('Successfully updated rec'))
      .catch(e => reject('Could not updated rec',e.message))
  })

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
