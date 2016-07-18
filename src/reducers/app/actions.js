import * as types from './actionTypes';
import * as constants from './constants';

var DeviceInfo = require('react-native-device-info');

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase(types.FIREBASE_URL);

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code

    dispatch(changeAppRoot('login'));
    // dispatch(startListeningToAuth());
  };
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}


export function login(name) {
  var deviceId = DeviceInfo.getUniqueID();
  var FirebaseTokenGenerator = require("firebase-token-generator");
  var tokenGenerator = new FirebaseTokenGenerator(constants.SECRET);
  var token = tokenGenerator.createToken({ uid: deviceId, name: name });

  return async function(dispatch, getState) {
    fireRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Login Succeeded!", authData); // this used to be a listener
        dispatch(changeAppRoot('after-login'));
        dispatch(setAuthData(authData)); // reminder this is only possible with thunk

      }
    });
  };
}


export function logout(){
  return function(dispatch,getState){
    fireRef.unauth();
    dispatch(setAuthData(undefined));
    dispatch(changeAppRoot('login'));
  };
}
export function setAuthErrorMessage(message) {
  return {type: types.SET_AUTH_ERROR_MESSAGE, message: message};
}
// This works for login and logout
export function setAuthData(authData){
  return { type: types.SET_AUTH_DATA, authData: authData }
}

export function setFirebaseAuthToken(authData) {
  return (dispatch, getState) => {
    fireRef.authWithCustomToken(authData.token, function(error, result) {
    if (error) {
      console.log("Authentication Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", result.auth);
      console.log("Auth expires at:", new Date(result.expires * 1000));
    }
  });
}

}

export function startListeningToAuth() { // fuck this function NOT USED
  return (dispatch, getState) => {
    fireRef.onAuth(function(authData){
      console.log('auth data listened',authData);
        if (authData){  // LOGIN
          dispatch(changeAppRoot('after-login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        } else { //
          // dispatch(changeAppRoot('login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        }
    });
  }
}
