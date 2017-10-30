const Permissions = require('react-native-permissions');
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
  USER_SIGNED_IN,
  SIGN_IN_CONFIRM_RESULT,
  SIGN_IN_ERROR,
  SIGN_IN_ATTEMPT,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  CONFIRM_CODE_ATTEMPT,
  SET_TOKEN,
  SET_APP_STATUS,
  SET_APP_ERROR,
  USER_SIGNED_OUT,
  USERS_LINKED,
  SET_USER_PHONE
} from '../actionTypes';
import { listenForRecs } from '../recommendations/actions'
import { listenForFriends } from '../friends/actions'
import { setUserToken } from '../user/actions'



// --------------------------------------------------------------
//    INIT APP
// --------------------------------------------------------------


export function initializeApp() {
  return (dispatch, getState) => {
    console.log('INIT',firebase.auth())
    // We may want to do certain things if the app is opened from a message
    // currently getInitialNotification isnt working
    dispatch(handleNotifications())

    // Kick off auth listener to handle updating user object
    // This will fire every time the app loads no matter what
    firebase.auth().onAuthStateChanged(function(user) {
      // console.log('onAuthStateChanged', user)
      console.warn('onAuthStateChanged ',user.uid)
      // Add user data to redux (registered or anon)
      // Fire off event listeners
      if (user) {


        dispatch({ type: USER_SIGNED_IN, user })
        console.warn(user.isAnonymous)

        console.warn(user.displayName)

        // Start some Firestore data listeners to handle ALL data
        // Note: this may become an issue if user is without internet
        dispatch(listenForRecs(user.uid))
        dispatch(listenForFriends(user.uid))

      } else {
        console.log('signing in as anon')
        // No user is signed in. so lets authenticate anon
        firebase.auth().signInAnonymously()
      }
    });

    dispatch(setToken())
  }
}

// --------------------------------
//    HANDLE NOTIFICATIONS
// --------------------------------

function handleNotifications() {
  return dispatch => {

    const messaging = firebase.messaging()

    messaging.onMessage( (notif) => {
      // console.warn('onMessage!!')
      // console.log(notif)
      dispatch({type: SET_APP_STATUS, status: 'OnMessage fired'})
    })

    // @todo
    // this is bugging right now per github issues threads

    messaging.getInitialNotification().then(notif=>{
      // console.warn('getInitialNotification')
      // console.log(notif)
      if(!notif) {
        // turning this off cause its annoying
        // dispatch({type: SET_APP_ERROR, error: {message: 'InitialNotification is empty'} })
      } else {
        // this apperantly works. not sure what the notif object is like
        // and not too sure how to redirect the user to a different page
        dispatch({type: SET_APP_STATUS, status: 'Initial Notification is not empty!'})
      }
    });
  }
}

// --------------------------------
//    GET FCM TOKEN
// --------------------------------

function setToken() {
  return (dispatch, getState) => {
    const user = getState().user
    const app = getState().app

    // console.log('setToken',app)
    // @todo might be a bug here
    if(!app.token) {
    // if(true) {
      firebase.messaging().getToken().then(token => {

        var userRef = firebase.firestore().collection("users").doc(user.uid)

        userRef.get().then(userDoc => {
          if(userDoc.exists){
            // simply update the doc
            userRef.update({ token }).then(() => dispatch({type: SET_APP_STATUS, status: 'UPDATED user to database'}))
          } else {
            // need to create user
            userRef.set({
              token,
              createdAt: Date.now(),
              uid: user.uid,
              // phoneNumber: user.phoneNumber
            }).then(() => dispatch({type: SET_APP_STATUS, status: 'ADDED user to database'}))
          }
        })

        dispatch({type: SET_TOKEN, token})
        dispatch({type: SET_APP_STATUS, status: 'token set!'})
      })
    }
  }
}



// --------------------------------
//    VERIFY PHONE NUMBER
// --------------------------------

export function verifyPhone(phoneNumber) {
  return (dispatch, getState) => {
    // Following code is from https://github.com/invertase/react-native-firebase/issues/119

    const formatedNumber = `+1${phoneNumber}`

    firebase.auth()
  .verifyPhoneNumber(formatedNumber)
  .then((phoneAuthSnapshot) => {
    console.log(phoneAuthSnapshot);
    console.warn('verifyPhoneNumber.then()')
    // wait / get users code input then:
    // const { verificationId } = phoneAuthSnapshot;
    // const { codeInput } = this.state; // tied to your input box, for example
    // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);

    // Do something with your new credential, e.g.:
    // firebase.auth().signInWithCredential(credential);
    // firebase.auth().linkWithCredential(credential);
  })
  .catch((error) => {
    console.log(error);
    console.log(error.verificationId);
  });
  }
}


// --------------------------------
//    GET AUTH INVITE CODE
// --------------------------------

export function signInLink(phoneNumber) {
  return dispatch => {
    dispatch({type: SIGN_IN_ATTEMPT })

    const formatedNumber = `+1${phoneNumber}`

    firebase.auth().verifyPhoneNumber(formatedNumber)
      .then(phoneAuthSnapshot => {

        const { verificationId } = phoneAuthSnapshot;

        dispatch({type: SIGN_IN_CONFIRM_RESULT, confirmResult: phoneAuthSnapshot, verificationId, formatedNumber })
        dispatch({type: SET_APP_STATUS, status: 'code sent!'})
        dispatch({type: SET_USER_PHONE, phoneNumber: phoneNumber})
      })
      .catch(error =>  dispatch({type: SET_APP_ERROR, error })  );


  }
}



// --------------------------------
//    CONFIRM AUTH CODE
// @todo need to change this to actually handle users coming back and simply logging in
// --------------------------------

export function confirmCode(codeInput) {
  return (dispatch, getState) => {
    // const phoneNumber = getState().user.phoneNumber
    // const token = getState().app.token

    dispatch({type: CONFIRM_CODE_ATTEMPT, status: 'attempting'})
    dispatch({type: SET_APP_STATUS, status: 'attempting to confirm code'})
    const verificationId =  getState().app.confirmResult.verificationId //getState().app.verificationId

    // if(!verificationId) {
    //   alert('no verificationId something went way wrong')
    //   return
    // }
    //TMP


    var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput)

    // this works, but user comes out anon still
    // @todo need to fix
    firebase.auth().currentUser.linkWithCredential(credential)

    // this creates a new user that is not anon
    // firebase.auth().signInWithCredential(credential)
    // as of now, this will create a new user

    .then((firebaseUser) => {
      console.warn("Anonymous account successfully upgraded", firebaseUser);
      dispatch({type: SET_APP_STATUS, status: 'Anonymous account successfully upgraded, dispatch USERS_LINKED'})
      dispatch({ type: USERS_LINKED, user: firebaseUser._user })

      // now update user displayName because isAnon isnt working right now
      firebaseUser.updateProfile({
        displayName: 'TEMP',
      }).catch(error =>  dispatch({type: SET_APP_ERROR, error })  );


      // Now update user data in Firestore
      // User should already exist with their fcm token
      dispatch( createUser() )

    }, function(error) {
      // cb({error:'Error: '+error})
      console.log("Error upgrading anonymous account", error);
      dispatch({type: SET_APP_ERROR, error})


    });


    // if (confirmResult && codeInput.length) {
    //   confirmResult.confirm(codeInput)
    //     .then((user) => {
    //       dispatch({type: CONFIRM_CODE_SUCCESS})
    //     })
    //     .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` , status: 'error confirm error'}));
    // }

  }
}

// --------------------------------
//    SIGN OUT
// --------------------------------

export function signOut() {
  return dispatch => {
    // Actions.push('LoggedOut')
    // dispatch({type: USER_SIGNED_OUT})
    firebase.auth().signOut().then(() => {
      console.log('signined out!')
      dispatch({type: SET_APP_STATUS, status: 'User successfully signed out' })
      dispatch({type: USER_SIGNED_OUT})

      // Doesnt feel right to navigate from redux but it works well
      Actions.push('LoggedOut')
    })
    .catch(error =>  dispatch({type: SET_APP_ERROR, error })  );
  }
}



// --------------------------------
//    SET PERMISSION
// --------------------------------

export function setNotificationPermission(response) {
  return { type: SET_NOTIFICATION_PERMISSION, response}
}


// --------------------------------
//    UPDATE USER IN FIRESTORE
// --------------------------------

function updateUser(data) {
  return (dispatch, getState) => {
    const user = getState().user
    if(!user.uid) {
      alert('No UID, something is terribly wrong')
    } else {
      firebase.firestore().collection("users").doc(user.uid).update(data)
        .then(() =>  dispatch({type: SET_APP_STATUS, status: 'Updated User in firestore'}) )
        .catch(error =>  dispatch({type: SET_APP_ERROR, error}) )
    }
  }
}

// --------------------------------
//    CREATE USER IN FIRESTORE
// --------------------------------

function createUser() {
  return (dispatch, getState) => {
    const user = getState().user
    const app = getState().app
    if(!user.uid) {
      alert('No UID, something is terribly wrong')
    } else {
      const initialData = {
        uid: user.uid,
        token: app.token,
        phoneNumber: user.phoneNumber,
        linkedAt: Date.now(),
        displayName: user.displayName,
      }
      firebase.firestore().collection("users").doc(user.uid).set(initialData)
        .then(() =>  dispatch({type: SET_APP_STATUS, status: 'Updated User in firestore'}) )
        .catch(error =>  dispatch({type: SET_APP_ERROR, error}) )
    }
  }
}







// --------------------------------------------------------------
// Temp for dev
export function loginAsTest() {

  const email = 'test@kevaid.com'
  const password = '12345678'

  return dispatch => {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      dispatch({type: SET_APP_ERROR, error})
      console.log('login!',error)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
}

// --------------------------------------------------------------
// Temp for dev
export function registerAsTest() {
  // This will link the anon account w a new account
  const email = 'test@kevaid.com'
  const password = '12345678'

  console.log('registerAsTest')

  return dispatch => {
    console.log('registerAsTest dispatched')



    var credential = firebase.auth.EmailAuthProvider.credential(email, password);

        firebase.auth().currentUser.linkWithCredential(credential).then((firebaseUser) => {
          console.log("Anonymous account successfully upgraded", firebaseUser);
          console.log("firebaseUser._user", firebaseUser._user);
          console.warn("Anonymous account successfully upgraded");

          // Need to be careful because authStateChanged isnt fired
          // by linking accounts
          // so we need to call some of that manually

          // const user = {...firebaseUser._user}
          dispatch({ type: USERS_LINKED, user: firebaseUser._user })


          // Now lets add the info to the user doc
          // this times its email, next time its phone

          dispatch(updateUser({email, linkedAt: Date.now() }))

        }, function(error) {
          console.warn("Error upgrading anonymous account", error);
          console.log('code?',error.code)
          dispatch({type: SET_APP_ERROR, error})
          // if we reach here, most likely the account already exists, so lets try to just login
          dispatch(loginAsTest())
        });

  }
}
