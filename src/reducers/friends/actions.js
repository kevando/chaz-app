import firebase from 'react-native-firebase';
import {
  SAVE_FRIEND,
} from './actionTypes';

const FriendsRef = firebase.firestore().collection("friends")


export function addFriend(friend) {
  return(dispatch,getState) => {
    friend.uid = getState().app.uid // add rec owner

    FriendsRef.add(friend)
    .then(docRef => {
      friend.id = docRef.id
      dispatch({ type: SAVE_FRIEND, friend })
    })
  }
}


export function saveFriend(friend) {
  return { type: SAVE_FRIEND, friend }
}
