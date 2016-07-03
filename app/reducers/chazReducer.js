// reducers should always be instantaneous and free of side effects,
//and simply react synchronously to an action notification just received.

import * as types from '../actions/actionTypes';
const _ = require('lodash');

const initialState = {
  authData: {
    // auth:{},
    // expires: null,
    // password:{},
    // provider: null,
    // token: null,
    // uid: null,
  },
  recSort:'newest',
  recFilter:'all',
  // displayRecs: [] didnt work
};

// i am still kind of confused why a reducer is the place to define an initial state
// whatever though

// this reduce handles EVERHTHING at themoment. but i proably want to split that up

export default function chaz(state = initialState, action = {}) {

  switch (action.type) {

    case types.SET_AUTH_DATA:
      return {
        ...state,
        authData: action.payload
      };

    case types.UPDATE_RECS_LIST:
      // New rec was added to then add it to the state tree
      return {
        ...state,
        recs: action.payload
      }
    case types.UPDATE_DISPLAY_RECS_FILTER:
      return {
        ...state,
        recFilter: action.payload
      }
    case types.UPDATE_DISPLAY_RECS_SORT:
      return {
        ...state,
        recSort: action.payload
      }

    case types.UPDATE_DISPLAY_RECS_LIST:
      // FILTER RECS
      var displayRecs = state.recs; // all recs
      if(state.recFilter == 'graded')
        displayRecs = _.filter(state.recs, function(rec) { return typeof rec.grade !== 'undefined'; });
      if(state.recFilter == 'ungraded')
        displayRecs = _.filter(state.recs, function(rec) { return typeof rec.grade === 'undefined'; });

      // SORT RECS
      displayRecs.sort(function(a, b) {
        if(state.recSort == 'oldest')
          return parseFloat(a.createdAt) - parseFloat(b.createdAt);
        if(state.recSort == 'newest')
          return parseFloat(b.createdAt) - parseFloat(a.createdAt);
        if(state.recSort == 'best'){
          console.log('SORT BY BEST');
          return parseFloat(b.recrScore) - parseFloat(a.recrScore);
        }
      });

      return {
        ...state,
        displayRecs: displayRecs
      }
    case types.UPDATE_RECRS_LIST:
      // New rec was added to then add it to the state tree
      return {
        ...state,
        recrs: action.payload
      }


      default: // catch all
        return state;
  };
}
