import {firebaseConfig} from './constants';
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const timer = require('react-native-timer');
const DeviceInfo = require('react-native-device-info');

 // could probably do an auth listener here. although i dont want to couple
 // that tightly with firebase

export function checkForAppUser() { // This dispatches CREATE_USER either way.
  return function(dispatch,getState){

  // console.log('check for app user',DeviceInfo);
  var uid = DeviceInfo.getUniqueID();
  var deviceName = DeviceInfo.getDeviceName();

  var fireRef = firebaseApp.database().ref();
  var connectedRef = fireRef.child('.info/connected');

  var internetConnection = false;

  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      internetConnection = true
      console.log("connected");
    } else {
      internetConnection = false;
      console.log("not connected");
    }
  });

  // Give firebase 2 seconds to figure itself out
  // It will jump from not connected to connected for some reason
  timer.setTimeout('firebaseSucks', function(){

    console.log('ok ok, are we connected or what?',internetConnection)
    if(internetConnection) {

      // TODO Refactor this when i do a sync for recs
      var usersRef = fireRef.child('users');
      var userRef = usersRef.child(uid);

      userRef.once("value", function(snapshot) {
        if(!snapshot.exists()){ // then lets create the user in firebase !

          dispatch({type:'SET_WELCOME_MESSAGE',message:'2: User was NOT in firebase so we created it'})

          userRef.set({uid:uid,name: deviceName});
          dispatch({ type:'CREATE_APP_USER',uid: uid, name: deviceName });

        } else { // If the user DOES exist, this is kinda weird
          dispatch({type:'SET_WELCOME_MESSAGE',message:'3: User actually exists in firebase so we pulled in the info'})
          // Basically the person got logged out on their phone.
          // TODO
          // Will need to probably run additional sync code here for the recs and such
          dispatch({type:'CREATE_APP_USER',uid: uid, name: deviceName})
        }
      });
    } else {
      // if set welcome isnt first, the pop up shows initial state
      dispatch({type:'SET_WELCOME_MESSAGE',message:'1: firebase Timed out, probably no internet'})
      dispatch({type:'CREATE_APP_USER',uid: uid, name: deviceName});
    }

  }, 3000);

}

} // checkForAppUser fn probly too big


export function checkForAppUserr() { // This dispatches CREATE_USER either way.

  var fireRef = firebaseApp.database().ref();
  var connectedRef = fireRef.child('.info/connected');

  // var connectedRef = new firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/.info/connected");
  connectedRef.once("value", function(snap) {
    if (snap.val() === true) {
      console.log("connected");
    } else {
      console.log("not connected");
    }
  });

  if(true){

    return function(dispatch,getState){

      // check if user exists in firebase

      var uid = '12345'; // device ID



      var fireRef = firebaseApp.database().ref();
      var usersRef = fireRef.child('users');
      var userRef = usersRef.child(uid);

      // Set a timeout here

      userRef.once("value", function(snapshot) {

        console.log('firebase returned data, clear timer')
        timer.clearTimeout('firebaseTimer');

        var userExists = snapshot.exists();
        console.log('uid: '+uid, userExists )

        if(!userExists){ // then lets create the user in firebase !

          dispatch({type:'SET_WELCOME_MESSAGE',message:'2: User was NOT in firebase so we created it'})
          // make this a dispatch
          var usersRef = fireRef.child(`users`);

          var obj = {};
          obj[uid] = {uid:uid,name: "kevo dude"};

          usersRef.push(obj);
          dispatch({type:'CREATE_APP_USER',uid: uid});

        } else {
          dispatch({type:'SET_WELCOME_MESSAGE',message:'3: User actually exists in firebase so we pulled in the info'})
          // If the user DOES exist, this is kinda weird
          // Basically the person got logged out on their phone.
          // TODO
          // Will need to probably run additional sync code here for the recs and such
          dispatch({type:'CREATE_APP_USER',uid: uid})
      }

    });
}


  }
}
