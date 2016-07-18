import * as types from './actionTypes';
// import Immutable from 'immutable';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  count: 0,
});

export default function counter(state = initialState, action = {}) {
  // console.log('AppReducer State root',state.get('count'))
  // console.log('AppReducer action',action)
  switch (action.type) {
    case types.INCREMENT:
      return state.merge({
        count: state.get('count') + 1
      });
    case types.DECREMENT:
      return state.merge({
        count: state.count - 1
      });
    default:
      return state;
  }
}
