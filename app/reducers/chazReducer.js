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
  recSortOrder:'newest',
  recFilterOrder:'all',
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
    case types.UPDATE_RECRS_LIST:
      // New rec was added to then add it to the state tree
      return {
        ...state,
        recrs: action.payload
      }
    case types.SORT_REC_LIST:   // refactor todo. use lodash
      var sortedRecs = state.recs;
      sortedRecs.sort(function(a, b) {
        if(action.payload == 'oldest')
          return parseFloat(a.createdAt) - parseFloat(b.createdAt);
        else // oldest
          return parseFloat(b.createdAt) - parseFloat(a.createdAt);
      });
      return{
        ...state,
        recs: sortedRecs
      }
      case types.FILTER_REC_LIST:
        console.log('filtered list',state.recs)
        var filteredRecs = state.recs;

        if(action.payload == 'graded')
          filteredRecs = _.filter(state.recs, function(rec) { return typeof rec.grade !== 'undefined'; }); //filteredRecs = _.filter(state.recs, ['grade', false]);
        if(action.payload == 'ungraded')
          filteredRecs = _.filter(state.recs, function(rec) { return typeof rec.grade === 'undefined'; }); //filteredRecs = _.filter(state.recs, ['grade', false]);

        return{
          ...state,
          recs: filteredRecs
        }
      // should probly also be a UI_SET_WORD
      // case types.SET_DEFINITION:
      //   return {
      //     ...state,
      //     ui: {
      //       dufine: {
      //         word: "fresh",
      //         definition: action.payload
      //       }
      //
      //     }
      //   }
      //
      // case types.CLEAR_ACTIVE_DUFINE:
      //   return {
      //     ...state,
      //     ui: {
      //       dufine: null // this might need to change if ui gets more objects
      //     }
      //   }
      //   case types.SET_ACTIVE_DUFINE:
      //     return {
      //       ...state,
      //       ui: {
      //         dufine: action.payload
      //       }
      //     }
      //
      // //
      // // When a user clicks save
      // //
      // case types.SAVE_DUFINE:
      // GoogleAnalytics.trackEvent('Dufine','Added', { label: state.ui.dufine.definition.word } );
      //   return {
      //     ...state,
      //     dufines: [
      //       ...state.dufines,
      //       {
      //         word: state.ui.dufine.definition.word.toLowerCase(),
      //         photo: state.ui.dufine.photo,
      //         definition: state.ui.dufine.definition
      //       }
      //     ]
      //   };
      //
      //   case types.DELETE_DUFINE:
      //     GoogleAnalytics.trackEvent('Dufine','Deleted', { label: state.ui.dufine.definition.word } );
      //     var elementPosition = state.dufines.map(function(dufine) {return dufine.definition.word; }).indexOf(state.ui.dufine.definition.word);
      //     var firstHalf = state.dufines.slice(0, elementPosition);
      //     var secondHalf = state.dufines.slice(elementPosition + 1)
      //
      //     return {
      //       ...state,
      //       dufines: [
      //         ...firstHalf,
      //         ...secondHalf
      //       ],
      //     }
      //
      // case types.CLEAR_WELCOME_FLAG:
      //   return {
      //     ...state,
      //     showWelcome: false,
      //   }
      // //
      // // When a user uploads a Photo
      // //
      // case types.SAVE_PHOTO: // change to this to set photo
      //   return {
      //     ...state,
      //     ui: {
      //       dufine: {
      //         word: state.ui.dufine.word,
      //         photo: action.payload,
      //         definition: state.ui.dufine.definition
      //       }
      //
      //     }
      //   }
      default:
        // console.log('state, via reducer default catch all',state);
        return state;
  };
}
