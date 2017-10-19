import _ from 'lodash';
// var uuid = require('react-native-uuid');
// import Mixpanel from 'react-native-mixpanel';

// required twice?
// Mixpanel.sharedInstanceWithToken('976ab99070f5bcf9c9255e282330f0fe');

import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
  SET_REMINDER,
  DELETE_RECOMMENDATION,
  SET_STATUS,
  SET_FILTER,
  SET_GRADE,
} from './actionTypes';

const initialState =
  {
    unfinished: { },
    list: [ ],
    filter: 'all'
  };

export default function recs(recommendations = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case SET_TITLE:
      return {
        ...recommendations,
        unfinished: {
          id: 'key_' + Date.now(),
          title: action.title,
          status: 'unfinished',
          createdAt: Date.now()
        }
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

      // Make this middleware
      // Mixpanel.trackWithProperties("Rec Saved", recommendations.unfinished);

      var newRec = {...recommendations.unfinished, status: 'new'}
      var newList = [newRec].concat(recommendations.list);
      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    case SET_REMINDER:
      // alert(action.reminderDate)

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,reminder: action.reminderDate} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    case DELETE_RECOMMENDATION:

      console.log('delete?',recommendations)
      console.log('delete?',action)

      var newList = _.filter(recommendations.list, function(rec) {
        return rec.id != action.recId;
      });

      return {
        ...recommendations,
        list: newList,
      }
      // return recommendations

    // -------------------------------------------
    case SET_STATUS:

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,status: action.status} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    case SET_FILTER:

      return {
        ...recommendations,
        filter: action.filter,
      }

    // -------------------------------------------
    case SET_GRADE:

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,grade: action.grade} : rec;
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
