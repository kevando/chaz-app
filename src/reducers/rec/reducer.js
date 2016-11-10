import * as types from './actionTypes';
import Immutable, {Map,List} from 'immutable';

const initialState = Map(); // consider how to hydrate this on app load instead of set_recs

export default function recs(recs = initialState, action = {}) {

  switch (action.type) {

    case 'SET_RECS': //hydration I guess
      // not entirely sure why this response changed, but it did
      // now its in items


      // Moving away from rec objects being immutable Maps. Not sure I need that
      // now that I am moving away from the async storage
      return Map(action.payload.items);

    case types.ADD_REC:
      // console.log('addRec in reducer',action.payload);
      return recs.set(action.payload._id, action.payload);

    case types.UPDATE_REC:
      // console.log('new rec to update',action.payload)
      return recs.set(action.payload._id, action.payload);

    case types.GRADE_REC: // same as update rec
      return recs.update(
        recs.findIndex(function(rec) {
          return rec.get("id") === action.payload.id;
        }), function(rec) {
          return Map(action.payload); // return entire rec
        }
      );

    case types.DELETE_REC:
      return recs.delete(action.payload);

    default:
      return recs;
  }
}
