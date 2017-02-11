import _ from 'lodash';

import {
  SAVE_FRIEND,
} from './actionTypes';

const initialState = [ ];
// const initialState = [ {name:'kevando'},{name:'kev'},{name:'jim'} ];

export default function recs(friends = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case SAVE_FRIEND:
      return friends.concat([action.friend])

    // -------------------------------------------
    default:
      return friends;
  }
}
