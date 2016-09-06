import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = List([]);

export default function recs(recs = initialState, action = {}) {

  switch (action.type) {

    case types.LOAD_RECS_FROM_FIREBASE:
      return action.payload; // already base a List in the actionCreator

    case types.ADD_REC:
      return recs.push(Map(action.payload));

    case types.UPDATE_REC:
      // Find rec by index, and update entire object in recs List
      return recs.update(
        recs.findIndex(function(rec) {
          return rec.get("id") === action.payload.id;
        }), function(rec) {
          return Map(action.payload); // return entire rec
        }
      );
    case types.GRADE_REC: // same as update rec
      return recs.update(
        recs.findIndex(function(rec) {
          return rec.get("id") === action.payload.id;
        }), function(rec) {
          return Map(action.payload); // return entire rec
        }
      );

    case types.DELETE_REC:
      return recs.filterNot(rec => rec.get('id') == action.payload.id);

    default:
      return recs;
  }
}
