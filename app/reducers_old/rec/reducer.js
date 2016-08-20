import * as types from './actionTypes';
import * as Immutable from 'immutable';

var update = require('react/lib/update');

const initialState = Immutable.Map({
  loaded: false,
  all: [],
  visible: [],
  sort: 'newest',

  filters: Immutable.Map({ // chill spots, docuemtaries, websites
    type: Immutable.Map({
      active: 'all',
      list: Immutable.Map({
        all: Immutable.Map({ title: 'All', query: Immutable.List.of('default','book','movie','tv','music','food','podcast','app','place')}),
        default: Immutable.Map({ title: "Random", query: Immutable.List.of('default')}),
        book: Immutable.Map({ title: "Books", query: Immutable.List.of('book')}),
        movie: Immutable.Map({ title: "Movies", query: Immutable.List.of('movie')}),
        tv: Immutable.Map({ title: "TV Shows", query: Immutable.List.of('tv')}),
        music: Immutable.Map({ title: "Music", query: Immutable.List.of('music')}),
        food: Immutable.Map({ title: "Food", query: Immutable.List.of('food')}),
        podcast: Immutable.Map({ title: "Podcasts", query: Immutable.List.of('podcast')}),
        app: Immutable.Map({ title: "Apps", query: Immutable.List.of('app')}),
        place: Immutable.Map({ title: "Places", query: Immutable.List.of('place')}),
      }),
      // queries: Immutable.Map({
      //   all: Immutable.List.of('default','book','movie','tv','music','food','podcast','app','place'),
      //   default: Immutable.List.of('default'),
      //   book: Immutable.List.of('book'),
      //   movie: Immutable.List.of('movie'),
      //   tv: Immutable.List.of('tv'),
      //   music: Immutable.List.of('music'),
      //   food: Immutable.List.of('food'),
      //   podcast: Immutable.List.of('podcast'),
      //   app: Immutable.List.of('app'),
      //   place: Immutable.List.of('place'),
      // })
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
