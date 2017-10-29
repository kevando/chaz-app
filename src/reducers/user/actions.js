import firebase from 'react-native-firebase';
import {
  CREATE_USER,
  USER_SIGNED_OUT,
  USER_SIGNED_IN,
  SET_TOKEN,
  USER_CREATED,
} from '../actionTypes';

const UsersRef = firebase.firestore().collection("users")


// export function createUser(email, password, username,cb) {
//   return dispatch => {
//
//     var credential = firebase.auth.EmailAuthProvider.credential(email, password);
//
//     firebase.auth().currentUser.linkWithCredential(credential).then((firebaseUser) => {
//       console.log("Anonymous account successfully upgraded", firebaseUser);
//       // not sure why authStateChanged isnt called
//       // so calling this manually
//       // console.log('usernane')
//       const user = {...firebaseUser._user, username}
//       dispatch({ type: USER_CREATED, user })
//       // dispatch(setUserToken())
//       // Now add the username
//       firebaseUser.updateProfile({
//         displayName: username,
//       }).then(function(user) { // Update successful.
//         // createUserDoc(user)
//         createUserDoc(user)
//         cb() // reset page to Profile
//       }).catch(function(error) { // An error happened.
//         console.log('Error: ',error)
//         // cb({error:'updating user Error'})
//       });
//     }, function(error) {
//       // cb({error:'Error: '+error})
//       console.log("Error upgrading anonymous account", error);
//       if(error) { // == already exists, then lets try log the user in
//         dispatch(loginUser(email, password))
//       }
//     });
//
//   }
// }



// function createUserDoc(user) {
//   firebase.messaging().getToken().then(token => {
//     var userDoc = UsersRef.doc(user.uid)
//     userDoc.set({
//       email: user.email,
//       uid: user.uid,
//       username: user.displayName,
//       token
//     })
//   })
// }


// export function setUserToken() {
//   // console.log('set token?')
//   return (dispatch, getState) => {
//     const user = getState().user
//     // console.log('set token?',user)
//     if(!user.token) { // OR I need to refresh it for some reason
//       // console.log('set token?')
//       firebase.messaging().getToken().then(token => {
//         // console.log('set token',token)
//         var userDoc = UsersRef.doc(user.uid)
//         userDoc.update({
//           token,
//         })
//         dispatch({type: SET_TOKEN, token})
//       })
//
//     }
//
//
//   }
//
//
// }

// export function logoutUser() {
//   console.log('logout?')
//   return dispatch => {
//     console.log('logout?????')
//     firebase.auth().signOut().then(function() {
//       console.log('signout successful')
//       dispatch({type: USER_SIGNED_OUT})
//     }).catch(function(error) {
//       console.log('signout err',error)
//       // An error happened.
//     });
//   }
// }
