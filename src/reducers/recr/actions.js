import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');


export function listenForRecrs() {
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    recsRef.on('value', (snap) => {
        dispatch(getRecrList(snap));
    });
  }
}
export function getRecrList(snap) { // runs after basically any change to any rec
  return (dispatch, getState) => {

      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          // title: child.val().title,
          _key: child.key(),
          // recr: child.val().recr,
          // grade: child.val().grade,
          // createdAt: child.val().createdAt,
          // recrScore: child.val().recrScore
        });
      });
        // console.log('items',items);
      dispatch(updateRecrList(items)); // reducer call
  }
}
export function updateRecrList(recrs) {
  return { type: types.UPDATE_RECR_LIST,payload: recrs }
}
