import firebase from 'react-native-firebase';
// import { Actions } from 'react-native-router-flux';

import * as t from '../actionTypes'

import { categoriesRef } from '../../config/firebase'


// ----------------------------------------
//  GRAB FEELING DATA FROM FIRESTORE
// ----------------------------------------

export function fetchCategories() {
  // bad code, assumes this works all the time
  return (dispatch, getState) => {
    categoriesRef
      .get()
      .then(snap => {
        let categories = []
        snap.forEach(doc => {
          categories.push({...doc.data(), id: doc.id})
        });
        // console.warn(categories.length)
        dispatch({type: t.FETCH_CATEGORIES_SUCCESS, categories})
    })
  }
}
