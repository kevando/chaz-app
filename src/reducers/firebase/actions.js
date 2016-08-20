import {firebaseConfig} from './constants';
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const timer = require('react-native-timer');
const DeviceInfo = require('react-native-device-info');

 // could probably do an auth listener here. although i dont want to couple
 // that tightly with firebase

export function checkForAppUser() { // This dispatches CREATE_USER either way.
  return function(dispatch,getState){

    var uid = DeviceInfo.getUniqueID();
    var deviceName = DeviceInfo.getDeviceName();

    var fireRef = firebaseApp.database().ref();

    var usersRef = fireRef.child('users');
    var userRef = usersRef.child(uid);

    // fix this and add a timeout, and fix welcome message when this pulls from firebase on the else

    userRef.once("value", function(snapshot) {
      if(!snapshot.exists()){ // then lets create the user in firebase !

        // dispatch({type:'SET_WELCOME_MESSAGE',message:'2: User was NOT in firebase so we created it'})
        userRef.set({uid:uid,name: deviceName});
        dispatch({ type:'CREATE_APP_USER',uid: uid, name: deviceName });

      } else { // If the user DOES exist, this is kinda weird
        // dispatch({type:'SET_WELCOME_MESSAGE',message:'3: User actually exists in firebase so we pulled in the info'})
        // Basically the person got logged out on their phone.
        // TODO
        // Will need to probably run additional sync code here for the recs and such
        dispatch({type:'CREATE_APP_USER',uid: uid, name: deviceName});
      }
    });


}

} // checkForAppUser fn probly too big
