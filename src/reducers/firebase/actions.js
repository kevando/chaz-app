import { firebaseConfig } from '../config';
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const timer = require('react-native-timer');
const DeviceInfo = require('react-native-device-info');

import {Map,List} from 'immutable';

 // could probably do an auth listener here. although i dont want to couple
 // that tightly with firebase

export function checkForAppUser() { // This dispatches CREATE_USER either way.
  return function(dispatch,getState){

    var user =  {
      uid: DeviceInfo.getUniqueID(),
      name: DeviceInfo.getDeviceName(),
      appVersion: DeviceInfo.getReadableVersion()
    }

    var fireRef = firebaseApp.database().ref();
    var userRef = fireRef.child(`users/${user.uid}`);

    userRef.once("value", function(snapshot) {
      if(!snapshot.exists()){ // then lets create the user in firebase !
        user.welcomeMessage = 'User NOT in firebase so we created it';
        userRef.set(user);
        dispatch({type:'CREATE_APP_USER',payload: user});
      } else {  // If the user DOES exist, the person got logged out on their phone.
        user.welcomeMessage = 'FOUND User in firebase, so we pulled the data';
        // Will need to probably run additional sync code here for the recs and such
        dispatch(loadDataFromFirebase(user)); // handles CREATE APP USER
      }

    });
}

} // checkForAppUser fn probly too big


export function syncFirebase() {
  return function(dispatch,getState){
    var { app, recs, recrs } = getState();
    var uid = app.getIn(['user','uid']);
    var fireRef = firebaseApp.database().ref();

    console.log(recs.toJS())

    fireRef.child(`users/${uid}/recs`).set(recs.toJS());
    fireRef.child(`users/${uid}/recrs`).set(recrs.toJS());
  }
}

export function loadDataFromFirebase(user) { // hydrate on user sign in
  return function(dispatch,getState){

    var fireRef = firebaseApp.database().ref();
    var dataRef = fireRef.child(`users/${user.uid}`);

    dataRef.once("value", function(snapshot) {
      // Data to import
      var recs = [];
      var recrs = [];

      snapshot.child('recs').forEach((rec) => {
        recs.push(Map(rec.val()));
      });
      snapshot.child('recrs').forEach((rec) => {
        recrs.push(Map(rec.val()));
      });
      dispatch({type: 'LOAD_RECS_FROM_FIREBASE',payload:List(recs)});
      dispatch({type: 'LOAD_RECRS_FROM_FIREBASE',payload:List(recrs)}); // doing it this way could get complicated
      dispatch({type:'CREATE_APP_USER',payload: user});
      dispatch({type:'INIT_ONBOARD'}); // should have state data now
    });

  }
}

// Chat messages. Might want to pull this out


export function appendMessageToRec(message,rec_id) { // hydrate on user sign in
  return function(dispatch,getState){


    var fireRef = firebaseApp.database().ref();
    var chatsRef = fireRef.child(`messages/${rec_id}`);
    chatsRef.push({message:message});


  }
}

export function listenForMessages(rec_id) {
  return function(dispatch,getState){

    var fireRef = firebaseApp.database().ref();
    var messagesRef = fireRef.child(`messages/${rec_id}`);

    messagesRef.on('value', (snap) => {
      console.log('Listen for recs heard! I may need to unlisten this');

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          message: child.val().message,
          _key: child.key
        });
      });
      console.log('items',items)
        dispatch({type:'LOAD_MESSAGES',payload:items})

    });

  }
}

// Push new rec to recr user if user exists
export function assignRecr(rec) {
  return function(dispatch,getState){

    var recrs = getState().recrs;
    var recr = recrs.find(function(obj){return obj.get('id') === rec.recr_id });
    console.log('recr',recr);
    var recr_uid = recr.get('uid');
    if(recr_uid != undefined){
      console.log('then we found an online recr! Send him the rec we just added');
      var { app, recs, recrs } = getState();
      var uid = app.getIn(['user','uid']);
      var fireRef = firebaseApp.database().ref();
      fireRef.child(`users/${recr_uid}/recs`).push(rec);
    }

    // Now we push this rec to the user's recs list
    // The listener will fire and this user will see their new rec live!




    // console.log('Listen for recs',rec_id);
    //
    // var fireRef = firebaseApp.database().ref();
    // var messagesRef = fireRef.child(`messages/${rec_id}`);
    //
    // messagesRef.on('value', (snap) => {
    //   console.log('Listen for recs heard! I may need to unlisten this');
    //
    //   // get children as an array
    //   var items = [];
    //   snap.forEach((child) => {
    //     items.push({
    //       message: child.val().message,
    //       _key: child.key
    //     });
    //   });
    //   dispatch({type:'LOAD_MESSAGES',payload:items})
    //
    // });

  }
}
