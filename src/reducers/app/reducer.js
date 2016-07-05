import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  root: undefined, // 'login' / 'after-login'
  authError: ''
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root
      });
      case types.SET_AUTH_ERROR_MESSAGE:
        return state.merge({
          authError: action.message
        });
        case types.SET_AUTH_DATA:
          return state.merge({
            authData: action.authData
          });
    default:
      return state;
  }
}
