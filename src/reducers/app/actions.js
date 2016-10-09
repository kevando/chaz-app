import * as types from './actionTypes';
import {setRecs} from '../rec/actions';
import {setRecrs} from '../recr/actions';
import ddpClient from '../../ddp';

export function changeSignInStatus(status = false) {
  return { type: types.CHANGE_SIGN_IN_STATUS, status };
}

export function initializeApp() {
  // Pull in data from meteor
  return function(dispatch, getState) {
    ddpClient.subscribe("init", ['uid'], () => {
      const { recs, recrs } = ddpClient.collections;
      dispatch(setRecs(recs));
      dispatch(setRecrs(recrs));
      dispatch({type: types.APP_INITIALIZED}); // this loads the recs scene
    });
  }
}
// export function initialize(newState) {
//   // This function sets the intial route and dispatches the app to create a new user if not set
//   // I think its good to keep this here in case we want to do other stuff later
//   if(Object.keys(newState).length === 0){
//     console.log('no user data, so create one');
//     dispatch(createAppUser());
//   }
//
// }


//
// export function appInitialized() {
//   return async function(dispatch, getState) {
//     // since all business logic should be inside redux actions
//     // this is a good place to put your app initialization code
//     var authData = getState().app.get('authData');
//     console.log('auth data in action',authData);
//
//     if(authData.size > 0) { // user is logged in
//       console.log('this should not be firing',authData);
//       dispatch(changeAppRoot('after-login'));
//       // tried adding fireRef to the store. didnt work but still want to try this
//       // const uid = authData.get('uid');
//       // const firebaseRef = fireRef.child(`users/${uid}`);
//       // dispatch(setFirebaseRef(fireRef));
//
//     }
//
//     if(!authData)
//       dispatch(changeAppRoot('login'));
//
//   };
// }
//
// export function setFirebaseRef(firebaseRef) { // remove
//   return {type: types.SET_FIREBASE_REF, firebaseRef: firebaseRef};
// }
//
// export function changeAppRoot(root) {
//   return {type: types.ROOT_CHANGED, root: root};
// }
//
//
// export function login() {
//
//   var deviceId = DeviceInfo.getUniqueID();
//   var FirebaseTokenGenerator = require("firebase-token-generator");
//   var tokenGenerator = new FirebaseTokenGenerator(constants.SECRET);
//   var token = tokenGenerator.createToken({ uid: deviceId});
//   return async function(dispatch, getState) {
//     fireRef.authWithCustomToken(token, function(error, authData) {
//       if (error) {
//         console.log("Login Failed!", error);
//       } else {
//         console.log("Login Succeeded!", authData); // this used to be a listener
//
//         // dispatch(changeAppRoot('after-login')); // moving this to the screen
//
//         dispatch({ type: types.USER_LOGIN, authData: authData });
//       }
//     });
//   };
// }
//
//
// export function logout(){
//   return function(dispatch,getState){
//     fireRef.unauth();
//     dispatch({type: types.USER_LOGOUT});
//     dispatch(changeAppRoot('login'));
//   };
// }
export function setFilter(filter) {
  return {type: types.SET_FILTER, payload:filter};
}
//
// export function startListeningToAuth() { // fuck this function NOT USED aNYMORE
//   // return (dispatch, getState) => {
//   //   fireRef.onAuth(function(authData){
//   //     console.log('auth data listened',authData);
//   //       if (authData){  // LOGIN
//   //         dispatch(changeAppRoot('after-login'));
//   //         dispatch(setAuthData(authData)); // reminder this is only possible with thunk
//   //       } else { //
//   //         // dispatch(changeAppRoot('login'));
//   //         dispatch(setAuthData(authData)); // reminder this is only possible with thunk
//   //       }
//   //   });
//   // }
// }
