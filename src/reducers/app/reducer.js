import * as types from './actionTypes';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  root: 'login', //'init', // 'login' / 'after-login'
  authError: '', // remove
  authData: {},
  firebaseRef: {},
});

export default function app(state = initialState, action = {}) {
  console.log('AppReducer State root',state.get('root'))
  console.log('AppReducer action',action)
  switch (action.type) {

    case types.ROOT_CHANGED:
      // return state.merge({
      //   root: action.root
      // });
      // i think this is better
      return state.set( 'root', action.root );

      // case types.SET_FIREBASE_REF:
      //   console.log('-----fireref',action.firebaseRef)
      //   var asdf = action.firebaseRef;
      //   return state.merge({
      //     firebaseRef: asdf
      //   });

      case types.SET_AUTH_ERROR_MESSAGE:
        return state.merge({
          authError: action.message
        });
        case types.SET_AUTH_DATA:
        console.log('SET_AUTH_DATA');
          return state.merge({
            authData: action.authData
          });
    default:
      return state;
  }
}
