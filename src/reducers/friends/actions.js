import firebase from 'react-native-firebase';
import {
  SAVE_FRIEND,
  SET_FRIEND_ID,
  REFRESH_FRIENDS,
} from '../actionTypes';

const friendsRef = firebase.firestore().collection("friends")
const usersRef = firebase.firestore().collection("users")


export function addFriend(friend) {
  return(dispatch,getState) => {
    friend.owner = getState().user.uid // add friend owner

    friendsRef.add(friend)
    .then(docRef => {
      console.log('friebnd',friend)
      const newFriend = {
        ...friend,
        id: docRef.id
      }
      dispatch({ type: SAVE_FRIEND, friend: newFriend })
      dispatch({ type: SET_FRIEND_ID, friendId: docRef.id })
    })
  }
}


export function saveFriend(friend) {
  return { type: SAVE_FRIEND, friend }
}


export function assignUserToFriend(user,friend) {
  console.log('assignUserToFriend')

  // Query for uid based on username
  // this will actually happen in the RecView container
  return (dispatch, getState) => {
    const myUsername = getState().user.username
        // ok now that we have the user id, lets update the friend object
        friendsRef.doc(friend.id).update({uid:user.uid,username:user.username })
        .then(function() {
          console.log("Friend Doc successfully updated!");
          addMessage(user.uid,myUsername)
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
  }
  //

}

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



// Firestore Listener (called on appInitialized)
export function listenForFriends(uid) {
  return dispatch => {
  friendsRef.where("owner", "==", uid)
  // or recs that ive given
    .onSnapshot(function(querySnapshot) {
        var myFriends = [];
        console.log('friend listner fired!')
        querySnapshot.forEach(function(doc) {
            // console.log('recs listner',doc.data())
            myFriends.push({...doc.data(),id: doc.id});
        });
        dispatch({type: REFRESH_FRIENDS, myFriends})
    });
  }
}
