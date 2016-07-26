import * as types from './actionTypes';
import * as Immutable from 'immutable';

var update = require('react/lib/update');

const initialState = Immutable.Map({
  loaded: false,
  all: [],
  visible: [],
  sort: 'newest',

  filters: Immutable.Map({
    type: Immutable.Map({
      active: 'book',
      queries: Immutable.Map({all:['book','movie','default'],book:['book']})
    }),
  }),
  typeFilter: Immutable.Map({
    active: 'book',
    queries: Immutable.Map({all:['book','movie','default'],book:['book']})
  }),




});

export default function counter(state = initialState, action = {}) {

  switch (action.type) {

    case types.SET_LOADED:
      return state.set( 'loaded', action.loaded );

    case types.UPDATE_REC_LIST:
      return state.merge({
        all: action.payload
      });

    case types.UPDATE_REC_FILTER:
      return state.setIn( ['filters','type','active'], action.option );


    case types.UPDATE_VISIBLE_REC_LIST: //



      var updatedList = action.recs.sort(function(a,b) {
        return b.get('createdAt') - a.get('createdAt');
      });
      return state.set( 'visible', updatedList );


    default:
      return state;
  }
}
