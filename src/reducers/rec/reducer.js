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
      active: 'all',
      queries: Immutable.Map({
        all: Immutable.List.of('book','video','audio','default'),
        book: Immutable.List.of('book'),
        video: Immutable.List.of('video'),
        audio: Immutable.List.of('audio')
      })
    }),
    grade: Immutable.Map({
      active: 'all',
      queries: Immutable.Map({
        all: Immutable.List.of(0,1,2,3,4,5,undefined),
        graded: Immutable.List.of(0,1,2,3,4,5),
        ungraded: Immutable.List.of(undefined),
      })
    }),
  }),
  // typeFilter: Immutable.Map({
  //   active: 'book',
  //   queries: Immutable.Map({all:['book','movie','default'],book:['book']})
  // }),




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
      return state.setIn( ['filters',action.filter,'active'], action.option );


    case types.UPDATE_VISIBLE_REC_LIST: //



      var updatedList = action.recs.sort(function(a,b) {
        return b.get('createdAt') - a.get('createdAt');
      });
      return state.set( 'visible', updatedList );


    default:
      return state;
  }
}
