import * as types from './actionTypes';
import {Map,List} from 'immutable';

// cut down on syntax
// import { List, Map } from 'immutable';

var update = require('react/lib/update');

// succinct hack for generating passable unique ids
// const uid = () => Math.random().toString(34).slice(2);

const initialState = List([]);

const initialState_old = Map({
  loaded: false,
  all: List(),
  visible: [],
  sort: 'newest',

  filters: Map({ // chill spots, docuemtaries, websites
    type: Map({
      active: 'all',
      list: Map({
        all: Map({ title: 'All', query: List.of('default','book','movie','tv','music','food','podcast','app','place')}),
        default: Map({ title: "Random", query: List.of('default')}),
        book: Map({ title: "Books", query: List.of('book')}),
        movie: Map({ title: "Movies", query: List.of('movie')}),
        tv: Map({ title: "TV Shows", query: List.of('tv')}),
        music: Map({ title: "Music", query: List.of('music')}),
        food: Map({ title: "Food", query: List.of('food')}),
        podcast: Map({ title: "Podcasts", query: List.of('podcast')}),
        app: Map({ title: "Apps", query: List.of('app')}),
        place: Map({ title: "Places", query: List.of('place')}),
      }),
      // queries: Map({
      //   all: List.of('default','book','movie','tv','music','food','podcast','app','place'),
      //   default: List.of('default'),
      //   book: List.of('book'),
      //   movie: List.of('movie'),
      //   tv: List.of('tv'),
      //   music: List.of('music'),
      //   food: List.of('food'),
      //   podcast: List.of('podcast'),
      //   app: List.of('app'),
      //   place: List.of('place'),
      // })
    }),
    grade: Map({ // not used just yet
      active: 'all',
      queries: Map({
        all: List.of(0,1,2,3,4,5,undefined),
        graded: List.of(0,1,2,3,4,5),
        ungraded: List.of(undefined),
      })
    }),
  }),


});

export default function counter(recs = initialState, action = {}) {

  switch (action.type) {

    // case types.SET_LOADED:
    //   return state.set( 'loaded', action.loaded );

    // case types.UPDATE_REC_LIST:
    //   return state.merge({
    //     all: action.payload
    //   });

    // case types.UPDATE_REC_FILTER:
    //   return state.setIn( ['filters',action.filter,'active'], action.option );
    //
    // case types.UPDATE_VISIBLE_REC_LIST: //
    //   var updatedList = action.recs.sort(function(a,b) {
    //     return b.get('createdAt') - a.get('createdAt');
    //   });
    //   return state.set( 'visible', updatedList );

    case 'ADD_TODO':
      return todos.push(Map(action.payload));

    case types.ADD_REC:
      // console.log
      return recs.push(Map(action.payload));


    case 'addd_rec_old':
    // console.log
      var rec = Map({title: action.title});
      // return state.mergeIn(['all']).push(rec);
      var newAll = state.get('all').push(rec)
      return state.merge({
        all: newAll
      });


    default:
      return recs;
  }
}
