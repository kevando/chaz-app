import * as types from './actionTypes';
import * as constants from './constants';

var DeviceInfo = require('react-native-device-info');

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase(types.FIREBASE_URL);

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    var authData = getState().app.get('authData');
    console.log('auth data in action',authData);

    if(authData.size > 0) { // user is logged in
      console.log('this should not be firing',authData);
      dispatch(changeAppRoot('after-login'));
      // tried adding fireRef to the store. didnt work but still want to try this
      // const uid = authData.get('uid');
      // const firebaseRef = fireRef.child(`users/${uid}`);
      // dispatch(setFirebaseRef(fireRef));

    }

    if(!authData)
      dispatch(changeAppRoot('login'));

  };
}

export function setFirebaseRef(firebaseRef) { // remove
  return {type: types.SET_FIREBASE_REF, firebaseRef: firebaseRef};
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}


export function login() {

  var deviceId = DeviceInfo.getUniqueID();
  var FirebaseTokenGenerator = require("firebase-token-generator");
  var tokenGenerator = new FirebaseTokenGenerator(constants.SECRET);
  var token = tokenGenerator.createToken({ uid: deviceId});
  return async function(dispatch, getState) {
    fireRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Login Succeeded!", authData); // this used to be a listener
        dispatch(changeAppRoot('after-login')); // moving this to the screen
        dispatch(setAuthData(authData)); // reminder this is only possible with thunk

      }
    });
  };
}


export function logout(){
  return function(dispatch,getState){
    fireRef.unauth();
    // dispatch(setAuthData(undefined));
    dispatch({type: types.USER_LOGOUT});
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

export function startListeningToAuth() { // fuck this function NOT USED aNYMORE
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
