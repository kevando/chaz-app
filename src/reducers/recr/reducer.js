import * as types from './actionTypes';
import {Map, List} from 'immutable';

const initialState = List([]);

export default function counter(recrs = initialState, action = {}) {
  switch (action.type) {

    case types.ADD_RECR:
      return recrs.push(Map(action.payload));

    default:
      return recrs;
  }
}
