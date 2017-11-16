import _ from 'lodash';
import * as t from '../actionTypes'

const initialState = []

export default function feelings(feelings = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case t.FETCH_FEELINGS_SUCCESS:
      return action.feelings

    // -------------------------------------------
    default:
      return feelings;
  }
}
