import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

const _ = require('lodash');

export function attemptLogin(username) {

  return (dispatch, getState) => {
    fireRef.authWithPassword({
      email    : username+'@kevinhabich.com',
      password : '1'
    }, function(error, authData) { // previously
      if (error) {
        console.log("Auth Failed!", error);
        // todo handle invalid username
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
        if (authData){
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
          dispatch(getRecList()); // consider putting the listener here.
          dispatch(getRecrList()); // consider putting the listener here.
          // todo these should def be listeners
        }
    });
  }
}

export function logUserOut(){
  return function(dispatch,getState){
    dispatch(setAuthData({}));
    fireRef.unauth();
  };
}

//
//  Begin REC functions
//

export function addRec(recTitle) {                  // ADD NEW REC
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP });
  }
}
export function addRecWithRecr(recTitle,recr) {     // ADD REC WITH REC
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.push({ title: recTitle, createdAt: Firebase.ServerValue.TIMESTAMP,recr:{name: recr.name,_key:recr._key},recrScore:recr.score });
  }
}
export function removeRec(recKey){                  // REMOVE REC
  return function(dispatch, getState) {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.child(recKey).remove(); // can this be a listenr?
  }
}
export function setRecGrade(rec, grade){            // UPDATE REC GRADE
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
        console.log('recc',rec)
        if(typeof rec.grade !== 'undefined'){
          // console.log('rec.grade',rec.grade)
          totalGradedRecs++;
          recGradeSum += rec.grade;
        }
      });
      // console.log('1 recGradeSum',recGradeSum);
      // console.log('1 totalGradedRecs',totalGradedRecs);
      if(totalGradedRecs > 0)
        score = (recGradeSum/totalGradedRecs)*20;
      else
        score = 'No Score';

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
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var rec = childSnapshot.val();
        // this code is shit, but whatever.
        if(rec.recr){ // shit bugs out when there is no recr
          if(rec.recr._key == recrKey){
            var recRef = recsRef.child(childSnapshot.key())
            recRef.update({recrScore: score})
          }
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
export function createNewRecr(recrName, rec){   // this function should get refacctored later. data could be better arranged
  return function(dispatch, getState) {
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs`);

    recrsRef.orderByChild("name").equalTo(recrName).on('value', (snapshot) => {

      if(snapshot.exists()){

        var recr = snapshot.val();
        console.log('a recr by this name exists!',recr);
        // this is so bad that I am doing it this way, but I cant fucking figure out how to get this damn key
        _.findKey(recr, function(recr,recrKey) {
          console.log(recrKey); // should only ever return once
          dispatch(assignExistingRecr({_key:recrKey,name:recrName},rec));
          // todo refactor this shit def needs to change
          dispatch(updateRecRecrScore(recrKey,recr.score));
        });




      } else {
        console.log('CREATE NEW RECR');
        var newRecr = recrsRef.push({ name: recrName, createdAt: Firebase.ServerValue.TIMESTAMP, });
        dispatch(assignExistingRecr({_key:newRecr.key(),name:recrName},rec));
      }


    });




  }
}
export function getRecList() { // this probly bad,  not using anymore
  return (dispatch, getState) => {


    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.on('value', (snap) => { // this function i am not sure what it does exactly
      // get children as an array
      var items = [];
      // force a delay to watch the loading state
      setTimeout(function(){
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
        if(items.length > 0){
          dispatch(updateRecsList(items));
          dispatch(updateDisplayRecsList(items));
        }
      },2000)



    });
  }
}
export function listenForRecs() { // this does nothing atm i guess
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);
    recsRef.on('value', (snap) => {
        dispatch(getRecList());
    });
  }
}
export function getRecrList() { // this probly bad,  not using anymore
  return (dispatch, getState) => {


    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recrs`);
    recrsRef.on('value', (snap) => { // this function i am not sure what it does exactly
      // get children as an array
      var items = [];
      // force a delay to watch the loading state
      setTimeout(function(){
        snap.forEach((child) => {
          items.push({
            name: child.val().name,
            _key: child.key(),
            recs: child.val().recs,
            score: child.val().score
          });
        });
        // This then pushes the list of items to the state array
        if(items.length > 0){
          // console.log('recrs list',items)
          dispatch(updateRecrsList(items));

        }
      },2000)



    });
  }
}
export function listenForRecrs() { // does nothing i guess
  console.log('listen for Recrs')
  return (dispatch, getState) => {
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.chaz.authData.uid}/recs`);

    recrsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log('CHILD',child)
        items.push({
          name: child.val().name,
          _key: child.key(),
          recs: child.val().recs,
          score: child.val().score
        });
      });
      console.log('1update recrs',items);
      // dispatch(updateRecrsList(items));
    });
    // console.log('2update recrs',items);
  }
}

// Display Rec list functions
export function updateDisplayRecsFilter(filter) {
  return {
    type: types.UPDATE_DISPLAY_RECS_FILTER,
    payload: filter
  }
}
export function updateDisplayRecsSort(orderBy) {
  return {
    type: types.UPDATE_DISPLAY_RECS_SORT,
    payload: orderBy
  }
}
export function updateRecsList(recs) {
  return {
    type: types.UPDATE_RECS_LIST,
    payload: recs
  }
}
export function updateDisplayRecsList() {
  return {
    type: types.UPDATE_DISPLAY_RECS_LIST,
    // payload: recs
  }
}

export function updateRecrsList(recrs) {
  return {
    type: types.UPDATE_RECRS_LIST,
    payload: recrs
  }
}
