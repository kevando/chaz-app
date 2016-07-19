import * as types from './actionTypes';
// import Immutable from 'seamless-immutable';

// const initialState = Immutable({
//   all: [],
//   visible: [], //
//
// });

import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  loaded: false,
  all: [],

});


export default function counter(state = initialState, action = {}) {
  console.log('RecReducer State',state);
  console.log('RecReducer action',action)
  switch (action.type) {

    case types.SET_LOADED:
      return state.set( 'loaded', action.loaded );

    case types.UPDATE_REC_LIST:
    console.log('action',action.type)
    console.log('payload',action.payload);
    console.log('state',state);
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
