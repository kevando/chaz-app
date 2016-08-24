import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  user: {},
  welcomeMessage: 'nothing'
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    case types.CREATE_APP_USER:
      return state.merge({
        user: action.payload
      });

    default:
      return state;
  }
}
