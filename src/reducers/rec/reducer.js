import * as types from './actionTypes';
import * as Immutable from 'immutable';

var update = require('react/lib/update');

const initialState = Immutable.Map({
  loaded: false,
  all: [],
  visible: [],
  sort: 'newest',

  filters: Immutable.Map({ // chill spots, apps, docuemtaries, websites
    type: Immutable.Map({
      active: 'all',
      queries: Immutable.Map({
        all: Immutable.List.of('book','movie','tv','music','food','podcast','default'),
        book: Immutable.List.of('book'),
        tv: Immutable.List.of('tv'),
        movie: Immutable.List.of('movie'),    // can probly refactor this
        music: Immutable.List.of('music'),
        food: Immutable.List.of('food'),
        // bird: Immutable.List.of('podcast'),
        // dolphin: Immutable.List.of('podcast'),
        default: Immutable.List.of('default'),
      })
    }),
    grade: Immutable.Map({ // not used just yet
      active: 'all',
      queries: Immutable.Map({
        all: Immutable.List.of(0,1,2,3,4,5,undefined),
        graded: Immutable.List.of(0,1,2,3,4,5),
        ungraded: Immutable.List.of(undefined),
      })
    }),
  }),


});

export default function counter(state = initialState, action = {}) {

  switch (action.type) {

    case types.SET_LOADED:
      return state.set( 'loaded', action.loaded );

    case types.UPDATE_REC_LIST:
      return state.set({
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
