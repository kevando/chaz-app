import _ from 'lodash';
var uuid = require('react-native-uuid');

import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
  SET_REMINDER,
  DELETE_RECOMMENDATION,
} from './actionTypes';

const initialState =
  {
    unfinished: {title: 'Rick and Morty', friend: 'Kevin Habich'},
    list: [
      // {
      //   title: 'chaz',
      //   friend: 'Kevin',
      //   status: 'using',
      //   category: 'other',
      //   note: 'because super fresh',
      // },
    ],

  };

export default function recs(recommendations = initialState, action = {}) {

  switch (action.type) {

    case SET_TITLE:
      return {
      ...recommendations,
      unfinished: {title: action.title, id: uuid.v1()}
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
      var newList = [recommendations.unfinished].concat(recommendations.list);
      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    case SET_REMINDER:

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,reminder: true} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }
    // -------------------------------------------
    case DELETE_RECOMMENDATION:

      var newList = _.filter(recommendations.list, function(rec) {
        return rec.id != action.recId;
      });

      return {
        ...recommendations,
        list: newList,
      }
    // -------------------------------------------
    default:
      return recommendations;
  }
}
