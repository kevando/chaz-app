import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  user: {},
  welcomeMessage: 'nothing'
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    // Used for testing, will show in the pop up after authenticating
    case types.SET_WELCOME_MESSAGE:
      return state.set( 'welcomeMessage', action.message );

    case types.CREATE_APP_USER:
      return state.merge({
        user: {uid: action.uid, name: 'Kevo'}
      });

    default:
      return state;
  }
}
