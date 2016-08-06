import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

export function listenForRecs() { //fetch
  return (dispatch, getState) => {
    // console.log('LISTENFOR RECS CALLED');
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recsRef = fireRef.child(`users/${uid}/recs`);
    recsRef.on('value', (snap) => {
      console.log('fireRef listened, now change loaded to true',snap);
      dispatch({type: types.SET_LOADED, loaded: true});
      dispatch(getRecList(snap));
        // dispatch(syncRecrList(snap));
    });
  }
}
export function syncRecrList(snap) { // fuck yeah if this works
  return (dispatch, getState) => {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
      var items = [];
      snap.forEach((child) => {
        var recObject = child.val(); // doing this cause firebase cant handle undefined
        recObject._key = child.key()

        if(recObject.recr){
          const recrsRecRef = fireRef.child(`users/${uid}/recrs/${recObject.recr._key}/recs/${recObject._key}`);
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
          comment: child.val().comment,
          createdAt: child.val().createdAt,
          recrScore: child.val().recrScore,
          type: child.val().type,
          note: child.val().note,
        }
        items.push(recObject);


      });
        // console.log('items',items);
      dispatch(updateRecList(items)); // reducer call

  }
}
export function updateRecList(recs) {
  return function(dispatch, getState) {
    dispatch({ type: types.UPDATE_REC_LIST,payload: recs });
    dispatch(updateVisibleRecList(recs)); // i always want to do this, right?
  }

}
export function updateFilter(filter,option){
  return function(dispatch, getState) {
    dispatch({type: types.UPDATE_REC_FILTER, filter:filter, option:option});
    dispatch(updateVisibleRecList()); // i always want to do this, right?
  }

  // return {type: types.UPDATE_REC_FILTER, filter:filter}
}


export function updateVisibleRecList() {
  return function(dispatch, getState) {
    const state = getState();
    const recList = state.rec.get('all');
    // console.log('all rec list',recList)


    // Set type filter from redux
    var activeTypeFilter = state.rec.getIn(['filters','type','active']);
    var activeTypeFilterQuery = state.rec.getIn(['filters','type','queries',activeTypeFilter]);

    // console.log('activeTypeFilter',activeTypeFilter);
    // console.log('activeTypeFilterQuery',activeTypeFilterQuery);
    console.log(activeTypeFilter.includes("book"));
    // activeTypeFilter = activeTypeFilter.toJS();


    // seperately get the grade filter settings
    var activeGradeFilter = state.rec.getIn(['filters','grade','active']);
    var activeGradeFilterQuery = state.rec.getIn(['filters','grade','queries',activeGradeFilter]);
    // console.log('activeGradeFilter',activeGradeFilter);
    // console.log('activeGradeFilterQuery',activeGradeFilterQuery);
    // console.log(activeGradeFilterQuery.includes(null));
    // fml firebase doesnt do null and immutable doesnt do undefined
    // FUCK THIS

    const filteredList = recList.filter(function(rec) {
      // console.log('GRADE: ',rec.get('grade'));
      return (
        // activeGradeFilterQuery.includes(rec.get('grade')) &&
        activeTypeFilterQuery.includes(rec.get('type'))
      )

    });
    // console.log('filtered list',filteredList)

    dispatch({ type: types.UPDATE_VISIBLE_REC_LIST, recs: filteredList });
  }
}

export function addRec(recTitle,recNote) {                  // ADD NEW REC
  return function(dispatch, getState) {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recsRef = fireRef.child(`users/${uid}/recs`);
    const recType = (currentState.rec.getIn(['filters','type','active']) != 'all' ? currentState.rec.getIn(['filters','type','active']) : 'default');
    var newRec = recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP,type:recType,note:recNote });
    dispatch(trackRecAdded(recTitle,recType,currentState.rec.get('all').size));

  }
}
export function trackRecAdded(recTitle,recType,recsTotal){
  return {
    type: 'TRACK_REC_ADDED',
    payload: {
      recTitle: recTitle,
      recType: recType,
      recsTotal: recsTotal
    }
  }
}
export function removeRec(recKey){                  // REMOVE REC
  return function(dispatch, getState) {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recsRef = fireRef.child(`users/${uid}/recs`);
    recsRef.child(recKey).remove();
    // todo dispatch upgrade recr score and recs recr score
    // consider if I need to do any other checks
    // I feel like properly structred data would help alot here
    dispatch({type: 'TRACK_REC_DELETED'});
  }
}
export function updateRecTitle(rec,title) {                  // UPDATE REC TITLE
  return function(dispatch, getState) {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recsRef = fireRef.child(`users/${uid}/recs/${rec._key}`);
    recsRef.update({ title: title });
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
