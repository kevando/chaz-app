import _ from 'lodash';

import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
} from './actionTypes';

const initialState =
  {
    unfinished: {},
    list: [
      {
        title: 'chaz',
        friend: 'Kevin',
        status: 'using',
        category: 'other',
        note: 'because super fresh',
      },
    ],

  };

export default function recs(recommendations = initialState, action = {}) {

  switch (action.type) {

    case SET_TITLE:
      return {
      ...recommendations,
      unfinished: {title: action.title}
      }

    // -------------------------------------------
    case SET_FRIEND:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          friend: action.friend
        }
      }

    // -------------------------------------------
    case SAVE_RECOMMENDATION:
      var newList = recommendations.list.concat([recommendations.unfinished]); // Merges both 'arrays'
      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    default:
      return recommendations;
  }
}
