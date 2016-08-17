import * as types from './actionTypes';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  root: 'login', //'init', // 'login' / 'after-login'
  authError: '', // remove
  authData: {},
  firebaseRef: {},
  // onboarding: {}
  // filters: [
  //   {
  //     default: 'all',
  //     options: ['all','graded','ungraded']
  //   }
  // ]
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    case types.ROOT_CHANGED:
      return state.set( 'root', action.root );

    case types.USER_LOGIN:
      return state.merge({
        authData: action.authData
      });


    default:
      return state;
  }
}
