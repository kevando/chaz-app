import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  all: [],
  visible: [], // 

});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
      return state.merge({
        count: state.count + 1
      });
    case types.UPDATE_REC_LIST:
      return state.merge({
        all: action.payload
      });
    case types.UPDATE_CURRENT_REC:
      return state.merge({
        current: action.rec
      });
    default:
      return state;
  }
}
