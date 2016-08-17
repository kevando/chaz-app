import * as types from './actionTypes';
// import Immutable from 'immutable';
import * as Immutable from 'immutable';

// const firebase = require('firebase');
// // Initialize Firebase
// const firebaseConfig = {
//   // apiKey: "gpOS3WKJz7ktdRIeUakqZtnHZEYtZienJAqeHYbz", // db key
//   apiKey: "AIzaSyDeWjn0xbocuyxX87PXQKPGbT9FlVNv6Xo", // works for auth
//   // apiKey: "ZpDJhoSPOLqrkvEpJHqVUW3pjFPewKFa69SaqKXJ", // new one from db and added to info
//   authDomain: "chaz-app.firebaseapp.com",
//   databaseURL: "https://chaz-app.firebaseio.com",
//   storageBucket: "",
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);


const initialState = Immutable.Map({
  count: 0,
});

export default function counter(state = initialState, action = {}) {

  // console.log('counter Reducer action',action)
  // console.log('counter Reducer state',state)

  switch (action.type) {
    case types.INCREMENT:
      return state.merge({
        count: state.get('count') + 1
      });
    case types.DECREMENT:
      return state.merge({
        count: state.count - 1
      });

    case 'REDUX_STORAGE_SAVE':
      // console.log('counter state save! now add to firebase',state.get('count'));

      // var fireRef = firebaseApp.database().ref();
      // console.log(fireRef)
      // var countsRef = fireRef.child('counts');
      // console.log(countsRef);
      // countsRef.set({ count: state.get('count')});

      break;

    default:
      return state;
  }
}
