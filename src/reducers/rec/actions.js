import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

export function listenForRecs() {
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
    recsRef.on('value', (snap) => {
        dispatch(getRecList(snap));
        dispatch(syncRecrList(snap));
    });
  }
}
export function syncRecrList(snap) { // fuck yeah if this works
  return (dispatch, getState) => {
    const currentState = getState();
      var items = [];
      snap.forEach((child) => {
        var recObject = child.val(); // doing this cause firebase cant handle undefined
        recObject._key = child.key()

        if(recObject.recr){
          const recrsRecRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recObject.recr._key}/recs/${recObject._key}`);
          recrsRecRef.once("value", function(snapshot) { // probly way over kill but idgaf
            if(snapshot.exists()){
              recrsRecRef.update(recObject);
            }
          });
      }

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
export function updateTitle(recTitle) {                  // ADD NEW REC
  return function(dispatch, getState) {

    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs/${currentState.rec.current._key}`);
    recsRef.update({ title: recTitle });
  }
}
export function setGrade(rec, grade) {                  // ADD NEW REC
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
    const recrRecrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${rec.recr._key}/recs`);

    recsRef.child(rec._key).update({grade:grade});
    // if recs get deleted or recr changed, the score will be wrong until the next update
    dispatch(updateRecrScore(rec.recr._key))
  }
}
export function updateRecrScore(recrKey) {
  return function(dispatch, getState) {
    const currentState = getState();
    const recrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recrKey}`);
    var score = 666; // never used
    var totalGradedRecs = 0;
    var recGradeSum = 0;
    // calculate score (this needs to become its own function. this us a huge part of the app)

    recrRef.child('recs').once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var rec = childSnapshot.val();
        if(typeof rec.grade !== 'undefined'){
          totalGradedRecs++;
          recGradeSum += rec.grade;
        }
      });
      console.log('1 recGradeSum',recGradeSum);
      console.log('1 totalGradedRecs',totalGradedRecs);
      if(totalGradedRecs > 0)
        score = (recGradeSum/totalGradedRecs)*20;
      else
        score = 'No Score';

      console.log('score',score)
      recrRef.update({score: score});
      dispatch(updateRecRecrScore(recrKey,score));
    });
  }
}
// adding recr score to all recs. this is where that gets updateDisplayRecsList
// it gets dispatched after a new recr score is created
export function updateRecRecrScore(recrKey, score) {
  return function(dispatch, getState) {
    console.log('updateRecRecrScore');
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
    recsRef.once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var rec = childSnapshot.val();
        // this code is shit, but whatever.
        if(rec.recr){ // shit bugs out when there is no recr
          if(rec.recr._key == recrKey){
            console.log('score',score)
            var recRef = recsRef.child(childSnapshot.key())
            recRef.update({recrScore: score})
          }
        }

      });
    });
  }

}


//
// Display functions
//
export function setCurrentRec(rec) {                  // SET CURRENT REC
  return { type: types.UPDATE_CURRENT_REC, rec: rec }
}
