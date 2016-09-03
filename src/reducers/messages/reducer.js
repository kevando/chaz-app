// import * as types from './actionTypes';
import {Map, List} from 'immutable';

const initialState = List([]);

export default function counter(messages = initialState, action = {}) {
  switch (action.type) {

    case 'LOAD_MESSAGES': // from firebase
      return action.payload; //

    default:
      return messages;
  }
}
