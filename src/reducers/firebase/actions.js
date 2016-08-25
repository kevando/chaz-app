import {firebaseConfig} from './constants';
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const timer = require('react-native-timer');
const DeviceInfo = require('react-native-device-info');

import {Map,List} from 'immutable';

 // could probably do an auth listener here. although i dont want to couple
 // that tightly with firebase

export function checkForAppUser() { // This dispatches CREATE_USER either way.
  return function(dispatch,getState){

    var uid = DeviceInfo.getUniqueID();
    var deviceName = DeviceInfo.getDeviceName();

    var fireRef = firebaseApp.database().ref();
    var userRef = fireRef.child(`users/${uid}`);

    var user =  {uid: uid, name: deviceName }
    userRef.once("value", function(snapshot) {
      if(!snapshot.exists()){ // then lets create the user in firebase !
        user.welcomeMessage = 'User NOT in firebase so we created it';
        userRef.set(user);
      } else {  // If the user DOES exist, the person got logged out on their phone.
        user.welcomeMessage = 'FOUND User in firebase, so we pulled the data';
        // Will need to probably run additional sync code here for the recs and such
        dispatch(loadDataFromFirebase(uid));
      }
      dispatch({type:'CREATE_APP_USER',payload: user});
    });
}

} // checkForAppUser fn probly too big


export function syncFirebase() {
  return function(dispatch,getState){
    var { app, recs, recrs } = getState();
    var uid = app.getIn(['user','uid']);
    var fireRef = firebaseApp.database().ref();
    fireRef.child(`users/${uid}/recs`).set(recs.toJS());
    fireRef.child(`users/${uid}/recrs`).set(recrs.toJS());
  }
}

export function loadDataFromFirebase(uid) {
  return function(dispatch,getState){
    console.log('Go to firebase and pull recs');

    var fireRef = firebaseApp.database().ref();
    var recsRef = fireRef.child(`users/${uid}/recs`);
    var recrsRef = fireRef.child(`users/${uid}/recrs`);

    // LOAD RECS
    recsRef.once("value", function(data) {
      recs = [];
      data.forEach((rec) => {
        recs.push(Map(rec.val()));
      });
      dispatch({type: 'LOAD_RECS_FROM_FIREBASE',payload:List(recs)});
    });

    // LOAD RECRS
    recrsRef.once("value", function(data) {
      recrs = [];
      data.forEach((recr) => {
        recrs.push(Map(recr.val()));
      });
      dispatch({type: 'LOAD_RECRS_FROM_FIREBASE',payload:List(recrs)});
    });
    // I dont like the logic behind this function
  }
}
