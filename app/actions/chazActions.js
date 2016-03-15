import * as types from './actionTypes';

const Firebase = require('firebase');
const fireRef = new Firebase('https://chaz1.firebaseio.com/');

export function attemptCreateUser(username) {
    return (dispatch) => {
      fireRef.createUser({
        email: username+"@kevinhabich.com",
        password: "1"
      }, function(error, authData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with user:", authData);

          // This should get handled by the listener?
          // this.attemptLogin(this.state.username);
        }
      });
    }
}

export function attemptLogin(username) {

  return (dispatch, getState) => {
    fireRef.authWithPassword({
      email    : username+'@kevinhabich.com',
      password : '1'
    }, function(error, authData) { // previously
      if (error) {
        console.log("Auth Failed!", error);
    } else {
      dispatch(setAuthData(authData)); // reminder this is only possible with thunk
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
        if (authData)
          dispatch(setAuthData(authData)); // reminder this is only possible with thunk
    });
  }
}

export function logUserOut(){
  return function(dispatch,getState){
    dispatch(setAuthData({}));
    fireRef.unauth();
  };
}

export function addRec(recTitle) {
  // creating a listener makes tons of sense because now I just need to add a rec
  // to firebase, then the listener will catch it and add it to the state, then
  // the new state will cause the app to re-render. Booyah!

  // this.recsRef.push({ title: text, timestampCreated: Firebase.ServerValue.TIMESTAMP })}},
}

export function listenForRecs(uid) { // I dont like passing in the uid here refactor todo
  // console.log('listen for recs action',this.state);

  const recsRef = fireRef.child(`users/${uid}/recs`);

  return (dispatch, getState) => {

    // I could do something with the state if I wanted to
    // Like here from a thunk counter example
    // const { counter } = getState(); doesnt work for some reason

    recsRef.on('value', (snap) => { // this function i am not sure what it does exactly

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key(),
          recr: child.val().recr, // I feel like I shouldnt have to do this
          grade: child.val().grade, // I feel like I shouldnt have to do this
        });
      });

      // console.log(items);
      dispatch(updateRecsList(items));
    });
  }
}

export function updateRecsList(recs) {
  return {
    type: types.UPDATE_RECS_LIST,
    payload: recs
  }

}
