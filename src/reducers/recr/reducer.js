import * as types from './actionTypes';
import {Map, List} from 'immutable';

const initialState = List([]);

export default function counter(recrs = initialState, action = {}) {
  switch (action.type) {

    case types.LOAD_RECRS_FROM_FIREBASE:
      return action.payload; // already base a List in the actionCreator

    case types.ADD_RECR:
      return recrs.push(Map(action.payload));

    case types.UPDATE_RECR_SCORE:
      // Find recr by index, and update just the score
      return recrs.update(
        recrs.findIndex(function(recr) {
          return recr.get("id") === action.payload.id;
        }), function(recr) {
          return recr.set('score',action.payload.score); 
        }
      );

    default:
      return recrs;
  }
}
