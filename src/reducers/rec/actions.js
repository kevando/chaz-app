import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

export function listenForRecs() {
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
    recsRef.on('value', (snap) => {
        dispatch(getRecList(snap));
    });
  }
}
export function getRecList(snap) { // runs after basically any change to any rec
  return (dispatch, getState) => {
    const currentState = getState();


      var items = [];
      snap.forEach((child) => {
        var recObject = {
          title: child.val().title,
          _key: child.key(),
          recr: child.val().recr,
          grade: child.val().grade,
          createdAt: child.val().createdAt,
          recrScore: child.val().recrScore
        }
        items.push(recObject);
        // update current rec with new data
        if(currentState.rec.current){
          if(currentState.rec.current._key == child.key()){
            console.log('updating current rec with fresh data');
            dispatch(setCurrentRec(recObject));
          }
        }
      });
        // console.log('items',items);
      dispatch(updateRecList(items)); // reducer call
      // dispatch(updateVisibleRecList(items)); // reducer all removing for now
  }
}
export function updateRecList(recs) {
  return { type: types.UPDATE_REC_LIST,payload: recs }
}
// TMP REMOVING
// export function updateVisibleRecList(recs) {
//   return { type: types.UPDATE_VISIBLE_REC_LIST, payload: recs }
// }

export function addRec(recTitle) {                  // ADD NEW REC
  return function(dispatch, getState) {

    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
    recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP });
  }
}
export function setRecGrade(rec, grade) {                  // ADD NEW REC
  return function(dispatch, getState) {
    console.log('set grade');
  }
}


//
// Display functions
//
export function setCurrentRec(rec) {                  // SET CURRENT REC
  return { type: types.UPDATE_CURRENT_REC, rec: rec }
}
