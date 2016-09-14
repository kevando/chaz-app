import * as types from './actionTypes';
import {Map, List} from 'immutable';



const initialState = Map();

export default function counter(recrs = initialState, action = {}) {
  switch (action.type) {

    case 'SET_RECRS':
      return Map(action.payload); 

    case types.ADD_RECR:
      return recrs.set(action.payload._id, action.payload);

    // case types.UPDATE_RECR:
    //   // Find recr by index, and update entire object in recs List
    //   return recrs.update(
    //     recrs.findIndex(function(recr) {
    //       return recr.get("id") === action.payload.id;
    //     }), function(recr) {
    //       return Map(action.payload); // return entire rec
    //     }
    //   );

    case types.UPDATE_RECR_STATS:
      // Find recr by index, and update just the score
      return recrs.update(
        recrs.findIndex(function(recr) {
          return recr.get("id") === action.payload.id;
        }), function(recr) {
          return recr.set('stats',action.payload.stats);
        }
      );

    default:
      return recrs;
  }
}
