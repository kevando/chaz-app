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


const recsRef = firebase.firestore().collection("recommendations")


export function initNewRec(payload) {
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

export function addRecommendation(unfinished) {
  return(dispatch,getState) => {
    // unfinished.to = getState().user.uid // may change based on give rec UI
    unfinished.createdBy = getState().user.uid // add rec owner
    unfinished.status = 'new'
    // console.log('unfinished',unfinished)
    recsRef.add(unfinished)
    .then(docRef => {
      dispatch({ type: SAVE_RECOMMENDATION_SUCCESS})
      addMessage(unfinished,getState().user.username)
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
  }
}

export function addRecommendationDev(friendName) {
  return(dispatch,getState) => {

    const unfinished = getState().recommendations.unfinished

    dispatch({type: 'ADD_REC', rec: {...unfinished, friend: {name:friendName}}})

  }
}
function addMessage(newRec,username) {
  firebase.firestore().collection("users").doc(newRec.to).get().then(function(user) {
    if (user.exists) {
        // console.log("user data:", user.data());
        var token = user.data().token
        var payload = {
          notification: {
            // title: 'new rec given to you',
            body: username + ' sent you a recommendation'
          }
        }
        firebase.firestore().collection("messages").add({token,payload})
    } else {
        console.log("No such user!");
    }
})

}


export function giveRec() {
  // in this case, user is the friend
  return(dispatch,getState) => {
    // unfinished.uid = getState().user.uid // add rec owner

    // console.log('unfinished',unfinished)
    var unfinished = {
      title: 'rec given',
      createdAt: Date.now(),
      status: 'new',
      friend: {
        uid: getState().user.uid,
        name: 'me',
      },
      owner: 'Other person'
    }
    reqecsRef.add(unfinished)
    .then(docRef => {
      // unfinished.id = docRef.id
      const newRec = {
        ...unfinished,
        id: docRef.id
      }
      dispatch({ type: SAVE_RECOMMENDATION, rec: newRec })
      // dispatch({ type: ADD_REC_TO_FRIEND, rec: newRec })
    })
    .catch(error => { // save in redux but as a firestore error todo
      console.error("Error adding document: ", error);
    });
  }
}

export function updateRecommendation(rec) {
  // DEV
  return { type: UPDATE_RECOMMENDATION, rec }
  
  // return(dispatch,getState) => {
  //   rec.updatedAt = Date.now()
  //   recsRef.doc(rec.id).update(rec) // might want to do this per field
  //   // dispatch({ type: UPDATE_RECOMMENDATION, rec })
  // }
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


// Firestore Listener (called on appInitialized)
export function listenForRecs(uid) {
  return dispatch => {



    // My recs
    // console.log('start listening')
    recsRef.where("to", "==", uid)
      .onSnapshot(querySnapshot => {
          var myRecs = [];
          // console.log('listner fired!')
          querySnapshot.forEach(function(doc) {
              // console.log('recs listner',doc.data())
              myRecs.push({...doc.data(),id: doc.id});
          });
          dispatch({type: REFRESH_MY_RECS, myRecs})
      });

      // Recommendations that I have given
      recsRef.where("from", "==", uid)
        .onSnapshot(querySnapshot => {
            var givenRecs = [];
            querySnapshot.forEach(doc => {
                givenRecs.push({...doc.data(),id: doc.id});
            });
            dispatch({type: REFRESH_GIVEN_RECS, givenRecs})
        });
  }
}
