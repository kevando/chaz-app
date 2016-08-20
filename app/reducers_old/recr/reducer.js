import * as types from './actionTypes';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  all: []

});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_RECR_LIST:
      // var names = [];
      // for(index in action.payload) {
      //   names.push(action.payload[index].name);
      // }
      return state.merge({
        all: action.payload,
      });
    case types.UPDATE_CURRENT_RECR:
      return state.merge({
        current: action.recr
      });
    default:
      return state;
  }
}
