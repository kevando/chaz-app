import _ from 'lodash';
import * as t from '../actionTypes'

const initialState = []

export default function categories(categories = initialState, action = {}) {
  // console.warn(categories.length)
  switch (action.type) {

    // -------------------------------------------
    case t.FETCH_CATEGORIES_SUCCESS:
      return action.categories

    // -------------------------------------------
    default:
      return categories;
  }
}
