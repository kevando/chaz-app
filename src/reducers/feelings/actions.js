const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import * as t from '../actionTypes'

import { feelingsRef } from '../../config/firebase'


// ----------------------------------------
//  GRAB FEELING DATA FROM FIRESTORE
// ----------------------------------------

export function fetchFeelings() {
  // bad code, assumes this works all the time
  return (dispatch, getState) => {
    feelingsRef
      .get()
      .then(snap => {
        let feelings = []
        snap.forEach(doc => {
          feelings.push({...doc.data(), id: doc.id})
        });
        dispatch({type: t.FETCH_FEELINGS_SUCCESS, feelings})
    })
  }
}
