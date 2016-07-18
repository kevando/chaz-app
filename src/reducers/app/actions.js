import * as types from './actionTypes';
import * as constants from './constants';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase(types.FIREBASE_URL);

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code

    dispatch(changeAppRoot('init')); // init app to login page. now handled in initial state
    // dispatch(startListeningToAuth()); // listen for auth changes
  };
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}

export function login(username) {
  return async function(dispatch, getState) {
    fireRef.authWithPassword({
      email    : username+'@kevinhabich.com',
      password : constants.PASSWORD
    }, function(error, authData) { // previously
      if (error)
        dispatch(setAuthErrorMessage(error.toString()));
      else {
        console.log('login auth data',authData);
      }
    });
  };
}
export function logout(){
  return function(dispatch,getState){
    fireRef.unauth();
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

export function startListeningToAuth() {
  return (dispatch, getState) => {
    fireRef.onAuth(function(authData){
      console.log('auth data listened',authData);
        if (authData){  // LOGIN
          dispatch(changeAppRoot('after-login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        } else { //
          dispatch(changeAppRoot('login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        }
    });
  }
}
