import firebase from 'react-native-firebase';
var uuid = require('react-native-uuid');
import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
  SET_REMINDER,
  DELETE_RECOMMENDATION,
  SET_STATUS,
  SET_FILTER,
  SET_GRADE,
  UPDATE_RECOMMENDATION,
} from './actionTypes';

const RecsRef = firebase.firestore().collection("recommendations")

export function setTitle(title) {
  return { type: SET_TITLE, title }
}

export function setFriend(friend) {
  return { type: SET_FRIEND, friend }
}

export function addRecommendation(unfinished) {
  return(dispatch,getState) => {
    unfinished.uid = getState().app.uid // add rec owner
    unfinished.status = 'new'
    RecsRef.add(unfinished)
    .then(docRef => {
      unfinished.id = docRef.id
      dispatch({ type: SAVE_RECOMMENDATION, unfinished })
    })
    .catch(error => { // save in redux but as a firestore error todo
      console.error("Error adding document: ", error);
    });
  }
}

export function updateRecommendation(rec) {
  return(dispatch,getState) => {
    rec.updatedAt = Date.now()
    RecsRef.doc(rec.id).update(rec) // might want to do this per field
    dispatch({ type: UPDATE_RECOMMENDATION, rec })
  }
}

export function setReminder(recId,reminderDate) {
  return { type: SET_REMINDER, recId, reminderDate }
}

export function deleteRecommendation(recId) {
  return { type: DELETE_RECOMMENDATION, recId }
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
