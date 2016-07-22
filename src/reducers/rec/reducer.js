import * as types from './actionTypes';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  loaded: false,
  all: [],
  visible: [],
  sort: 'newest',
  filter: 'all'
});

export default function counter(state = initialState, action = {}) {

  switch (action.type) {

    case types.SET_LOADED:
      return state.set( 'loaded', action.loaded );

    case types.UPDATE_REC_LIST:
      return state.merge({
        all: action.payload
      });

    case types.UPDATE_VISIBLE_REC_LIST:
      console.log('UPDATE_VISIBLE YO');
      var updatedList = state.get('all').sort(function(a,b) {
        return b.get('createdAt') - a.get('createdAt');
      });
      return state.set( 'visible', updatedList );


    default:
      return state;
  }
}
