import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  all: []

});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_RECR_LIST:
      return state.merge({
        all: action.payload
      });
    case types.UPDATE_CURRENT_RECR:
      return state.merge({
        current: action.recr
      });
    default:
      return state;
  }
}
