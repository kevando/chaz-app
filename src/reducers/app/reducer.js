import * as types from './actionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  user: {},
  activeFilter: 'all',
  filters: List(['all','movie','tv','podcast','book','music','food','place','other']),
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    case types.CREATE_APP_USER:
      return state.merge({
        user: action.payload
      });
    case types.SET_FILTER:
      return state.merge({
        activeFilter: action.payload
      });

    default:
      return state;
  }
}
