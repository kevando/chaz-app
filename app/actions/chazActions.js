import * as types from './actionTypes';

const Firebase = require('firebase');
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

// disabling new users for now
// export function attemptCreateUser(username) {
//     return (dispatch) => {
//       fireRef.createUser({
//         email: username+"@kevinhabich.com",
//         password: "1"
//       }, function(error, authData) {
//         if (error) {
//           console.log("Error creating user:", error);
//         } else {
//           console.log("Successfully created user account with user:", authData);
//
//           // This should get handled by the listener?
//           // this.attemptLogin(this.state.username);
//         }
//       });
//     }
// }

export function attemptLogin(username) {

  return (dispatch, getState) => {
    fireRef.authWithPassword({
      email    : username+'@kevinhabich.com',
      password : '1'
    }, function(error, authData) { // previously
      if (error) {
        console.log("Auth Failed!", error);
        // todo handle invalid username
    } else {
      dispatch(setAuthData(authData)); // reminder this is only possible with thunk
      dispatch(getRecsList()); // on login, get new list of recs
    }
  });
}

}
// This works for login and logout
export function setAuthData(authData){
  return {
    type: types.SET_AUTH_DATA,
    payload: authData
  }
}

// Run this function if auth ref changes
export function startListeningToAuth() {
  return (dispatch, getState) => {
    fireRef.onAuth(function(authData){
        if (authData)
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
    });
  }
}

export function logUserOut(){
  return function(dispatch,getState){
    dispatch(setAuthData({}));
    fireRef.unauth();
  };
}

export function addRec(recTitle) {

  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP });
  }
}
export function addRecWithRecr(recTitle,recr) {

  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP,recr:{name: recr.name,_key:recr._key},recrScore:recr.score });
  }
}
export function removeRec(recKey){
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    // const recrRecsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs/${recr._key}/recs`);
    recsRef.child(recKey).remove();
    // recrRecsRef.child(recKey).remove(); // probly should be a listener
  }
}
export function setRecGrade(rec, grade){ // args dont feel right
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    const recrRecrRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs/${rec.recr._key}/recs/${rec._key}`);
    recsRef.child(rec._key).update({grade:grade});
    // the following should probly be a listener
    recrRecrRef.update({grade:grade}); // this will fire off a listener
    // now also update the recr score
    dispatch(updateRecrScore(rec.recr._key))
  }
}
export function updateRecrScore(recrKey) {
  return function(dispatch, getState) {
    const currentState = getState();
    const recrRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs/${recrKey}`);
    var score = 666; // never used
    var totalGradedRecs = 0;
    var recGradeSum = 0;
    // calculate score (this needs to become its own function. this us a huge part of the app)

    recrRef.child('recs').once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var rec = childSnapshot.val();
        // console.log('rec',rec)
        if(typeof rec.grade !== 'undefined'){
          // console.log('rec.grade',rec.grade)
          totalGradedRecs++;
          recGradeSum += rec.grade;
        }
      });
    });
    // console.log('recGradeSum',recGradeSum);
    // console.log('totalGradedRecs',totalGradedRecs);
    if(totalGradedRecs > 0)
      score = (recGradeSum/totalGradedRecs)*20;
    else
      score = 'No Score';

    recrRef.update({score: score});
    dispatch(updateRecRecrScore(recrKey,score));

  }

}
// adding recr score to all recs. this is where that gets updateDisplayRecsList
// it gets dispatched after a new recr score is created
export function updateRecRecrScore(recrKey, score) {
  return function(dispatch, getState) {
    console.log('updateRecRecrScore');
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        var rec = childSnapshot.val();
        if(rec.recr._key == recrKey){
          var recRef = recsRef.child(childSnapshot.key())
          recRef.update({recrScore: score})
        }

      });
    });
  }

}
export function assignExistingRecr(recr, rec){

  return function(dispatch, getState) {
    const currentState = getState();
    const recrRecsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs/${recr._key}/recs/${rec._key}`);
    const recRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs/${rec._key}`);

    console.log('recr',recr)
    // add the existing recr to rec
    recRef.update({recr: {name: recr.name, _key:recr._key } });
    // add the rec to the recrs reclist
    recrRecsRef.set( {title: rec.title,_key:rec._key}); // i would prefer to send this a whole object but not gonna worry about it for now
    // should these final commands should be dispatches?

  }

}
export function createNewRecr(recrName, rec){
  return function(dispatch, getState) {
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs`);

    var newRecr = recrsRef.push({ name: recrName, createdAt: Firebase.ServerValue.TIMESTAMP, });
    dispatch(assignExistingRecr({_key:newRecr.key(),name:recrName},rec));

  }
}
export function getRecsList() { // this function makes things a little better, but i still need to get this better
  return (dispatch, getState) => {
    console.log('getRectList');

    const currentState = getState();

    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);

    recsRef.on('value', (snap) => { // this function i am not sure what it does exactly

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key(),
          recr: child.val().recr, // I feel like I shouldnt have to do this
          grade: child.val().grade, // I feel like I shouldnt have to do this
          createdAt: child.val().createdAt,
          recrScore: child.val().recrScore
        });
      });
      // This then pushes the list of items to the state array
      dispatch(updateRecsList(items));
      dispatch(updateDisplayRecsList(items));

    });
  }
}
export function listenForRecs() {

  return (dispatch, getState) => {
    console.log('-chazActions listenForReces return',this.state);
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);

    recsRef.on('value', (snap) => { // this function i am not sure what it does exactly

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key(),
          recr: child.val().recr, // I feel like I shouldnt have to do this
          grade: child.val().grade, // I feel like I shouldnt have to do this
          createdAt: child.val().createdAt,
          recrScore: child.val().recrScore
        });
      });
      // This then pushes the list of items to the state array
      dispatch(updateRecsList(items));
      dispatch(updateDisplayRecsList(items));
    });
  }
}
export function listenForRecrs() {
  console.log('listen for Recrs')
  return (dispatch, getState) => {
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs`);

    recrsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          _key: child.key(),
          recs: child.val().recs,
          score: child.val().score
        });
      });
      dispatch(updateRecrsList(items));
    });
  }
}

export function updateRecsList(recs) {
  return {
    type: types.UPDATE_RECS_LIST,
    payload: recs
  }
}
export function updateDisplayRecsList(recs) {
  return {
    type: types.UPDATE_DISPLAY_RECS_LIST,
    payload: recs
  }
}

export function updateRecrsList(recrs) {
  return {
    type: types.UPDATE_RECRS_LIST,
    payload: recrs
  }
}

export function sortBy(orderBy){
    return {
      type: types.SORT_REC_LIST,
      payload:orderBy
    }
}
export function filterBy(filterBy){
    return {
      type: types.FILTER_REC_LIST,
      payload:filterBy
    }
}
