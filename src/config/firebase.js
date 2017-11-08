import firebase from 'react-native-firebase'
import _ from 'lodash'
import * as t from '../reducers/actionTypes'


const env = process.env.NODE_ENV;
const dataVersion = 'v1'
const PREFIX = env + '_' + dataVersion + '_'

export const recsRef = firebase.firestore().collection(`${PREFIX}recommendations`)
export const friendsRef = firebase.firestore().collection(`${PREFIX}friends`)
export const usersRef = firebase.firestore().collection(`${PREFIX}users`)
export const messagesRef = firebase.firestore().collection(`${env}_messages`)

import { assignUserToFriend } from '../reducers/friends/actions'


// --------------------------------
//    AUTH LISTENER
//  (called on appInitialized)
// --------------------------------

export function listenForAuthChanges() {
  return (dispatch, getState) => {
    console.log('listenForAuthChanges')
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('onAuthStateChanged',user)
      if (user) {
        dispatch({ type: t.USER_IS_AUTHENTICATED, user })
        // Note: this may become an issue if user is without internet
        dispatch(addFirestoreListeners(user.uid))
      } else {
        // BRAND NEW USER OPENING APP FOR FIRST TIME
        firebase.auth().signInAnonymously()
        // console.warn('signInAnonymously')
      }
    }) // Auth Listener
  }
}

// Firestore Listener (called on appInitialized)
export function addFirestoreListeners(uid) {
  return (dispatch, getState) => {
    // console.log(getState().app)
    let myFriends = getState().friends // this might be empty
    let myRecs = getState().recommendations.myRecs
    let givenRecs = getState().recommendations.givenRecs
    // console.log('myFriends',myFriends)

    // MY FRIENDS
    friendsRef.where("owner", "==", uid)
    // or recs that ive given
      .onSnapshot(function(querySnapshot) {
          myFriends = []
          console.log('friend listner fired!')
          querySnapshot.forEach(function(doc) {
              // console.log('PUSH FRIEND',doc.data())
              myFriends.push({...doc.data(),id: doc.id});
          });
          dispatch({type: t.REFRESH_FRIENDS, myFriends})

          // this might cause issues, but friend data in rec objects isnt refreshing
          const myRecsWithFriendData =  _.map(myRecs, rec => {return {...rec,friend: _.find(myFriends,friend => friend.id === rec.from.id) || {} } })
          dispatch({type: t.REFRESH_MY_RECS, myRecs: myRecsWithFriendData})
      });


    // MY RECS
    recsRef
      .where("to.uid", "==", uid)
      .onSnapshot(querySnapshot => {
          myRecs = []
          querySnapshot.forEach(doc => {
              if(doc.data().status != "open")
                myRecs.push({...doc.data(),id: doc.id});

          })
          const myRecsWithFriendData =  _.map(myRecs, rec => {return {...rec,friend: _.find(myFriends,friend => friend.id === rec.from.id) || {} } })
          dispatch({type: t.REFRESH_MY_RECS, myRecs: _.orderBy(myRecsWithFriendData,['createdAt'],['desc']) })
      })

      // GIVEN RECS
      recsRef.where("from.uid", "==", uid)
        .onSnapshot(querySnapshot => {
            var givenRecs = [];
            querySnapshot.forEach(doc => {
                givenRecs.push({...doc.data(),id: doc.id});
            })
            // TODO join w friend data
            const givenRecsWithFriendData =  _.map(givenRecs, rec => {return {...rec,friend: _.find(myFriends,friend => friend.id === rec.to.id) || {} } })
            dispatch({type: t.REFRESH_GIVEN_RECS, givenRecs: givenRecsWithFriendData})
        });


      }
}



// --------------------------------
//    CHECK IF USER WAS INVITED
// --------------------------------

export function checkForInvitesByPhoneNumber(phoneNumber) {
  return (dispatch, getState) => {
    console.log('check for invites')
    let myInvites = []

    recsRef
      .where("type", "==", "invite")
      .where("status", "==", "open")
      .where("to.phoneNumber", "==", phoneNumber)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          myInvites.push({...doc.data(),id: doc.id})
          recsRef.doc(doc.id).update({status: 'accepted', acceptedAt: Date.now()}) // close this invite otherwise it can get triggered again
        })
        if(myInvites.length > 0){
          console.log('hey we found some invites!')
          dispatch({type: t.SET_USER_DATA, data: {myInvites} })
          dispatch(connectUsers(myInvites)) // add as friends
        }
      })
  }
}



// ----------------------------------------------------------------
//    CONNECT USERS
//    if theres an invite, the person invited needs the inviter
//    added to their friend list, and the inviter needs to know
//    the uid of the person he invited that just created an accnt
// ----------------------------------------------------------------

export function connectUsers(myInvites) {
  return (dispatch, getState) => {
    console.log('connectUesrs')
      _.forEach(myInvites,invite => {
        dispatch(addInviterAsFriend(invite))
        addMessage(invite.from.uid,`Hey ${invite.to.name} just joined chaz. Your invitation worked!`) // send inviter message that his innvite worked
        const newFriendObject = {...invite.to, uid: getState().user.uid} // this is me getting saved to inviters friend list
        assignUserToFriend(newFriendObject) // someone accepted MY invite, now add their userid to my friend object
      })
  }
}

function addInviterAsFriend(invite) {
  return (dispatch,getState) => {
    console.log('addInviterAsFriend', invite)
    // adds a duplicate user, need a way to link inviter to chaz rec
    let friend = {
      name: invite.from.displayName,
      owner: getState().user.uid,//invite.to.uid,
      createdAt: Date.now(),
      type: 'inviter',
      uid: invite.from.uid,
    }
    friendsRef.add(friend)
      .catch(error => dispatch({type: t.SET_APP_ERROR, error}))
}
}

function assignInvitedUserToFriend(invite) {
  friendsRef.doc(invite.to.id)
    .update({uid:invite.to.uid, connectedAt: Date.now(), dev:'assignInvitedUserToFriend'})
    .catch(error => dispatch({type: t.SET_APP_ERROR, error}))
}


function addMessage(uid,body) {

  usersRef.doc(uid).get().then(function(user) {
    if (user.exists) {
        console.log("user data:", user.data());
        var token = user.data().token
        var payload = {
          notification: {
            // title: 'new rec given to you',
            body: body
          }
        }
        messagesRef.add({token,payload})
          .catch(error=>console.warn(error.message))
    } else {
        console.warn("No such user!");
    }
})

}
