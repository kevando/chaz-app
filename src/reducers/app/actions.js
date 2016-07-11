import * as types from './actionTypes';
import * as constants from './constants';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase(types.FIREBASE_URL);

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('login')); // init app to login page
    dispatch(startListeningToAuth()); // listen for auth changes
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
    });
  };
}
export function logout(){
  return function(dispatch,getState){
    // dispatch(setAuthData({}));
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
export function setUser(authData){ // used only for analytics tracking
  return {
    type: 'SET_USER',
    track: {
      authData: authData
    }
  }
}

export function startListeningToAuth() {
  return (dispatch, getState) => {
    fireRef.onAuth(function(authData){
        if (authData){  // LOGIN
          dispatch(setUser(authData))
          dispatch(changeAppRoot('after-login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        } else { // LOGOUT
          dispatch(changeAppRoot('login'));
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
        }
    });
  }
}
