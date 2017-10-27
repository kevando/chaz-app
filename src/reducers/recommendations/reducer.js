import _ from 'lodash';
import {
  SET_TITLE,
  SET_FRIEND_ID,
  SAVE_RECOMMENDATION_SUCCESS,
  SET_REMINDER,
  // DELETE_RECOMMENDATION,
  SET_STATUS,
  SET_FILTER,
  SET_GRADE,
  // UPDATE_RECOMMENDATION,
  REFRESH_MY_RECS,
  REFRESH_GIVEN_RECS,
  SET_REC_TO,
  INIT_REC,
} from '../actionTypes';

const initialState =
  {
    unfinished: {},
    list: [ ],
    myRecs: [],
    givenRecs: [],
    filter: 'all'
  };

export default function recs(recommendations = initialState, action = {}) {
  // console.log(action)
  // console.log(recommendations)
  // console.log(recommendations.unfinished)
  switch (action.type) {

  // -------------------------------------------
  case INIT_REC:
    return {
      ...recommendations,
      unfinished: {
        ...action.payload, // contains to/from
        status: 'unfinished',
        createdAt: Date.now(),

      }
    }
    // -------------------------------------------
    case SET_TITLE:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          title: action.title,
        }
      }

    // -------------------------------------------
    case SET_FRIEND_ID:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          friendId: action.friendId
        }
      }

    // -------------------------------------------
    case SET_REC_TO:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          to: action.uid
        }
      }

    // -------------------------------------------
    // Saved rec to firestore, clear unfinished so UI refreshes
    case SAVE_RECOMMENDATION_SUCCESS:
      // console.log('SAVE_RECOMMENDATION_SUCCESS')
      return {
        ...recommendations,
        unfinished: {},
      }

    // -------------------------------------------
    // case UPDATE_RECOMMENDATION:
    //
    //   var newList = _.map(recommendations.list, function(rec) {
    //     return rec.id === action.rec.id ? action.rec : rec; // better way to do this for sure
    //   });
    //
    //   return {
    //     ...recommendations,
    //     list: newList,
    //   }
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
    // case DELETE_RECOMMENDATION:
    //
    //   var newList = _.filter(recommendations.list, function(rec) {
    //     return rec.id != action.rec.id;
    //   });
    //
    //   return {
    //     ...recommendations,
    //     list: newList,
    //   }
    //   // return recommendations

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
    // Take recs from firestore and add them here
    // case SYNC_USER_RECS:
    //   // console.log('userrecs',action.userRecs)
    //   // console.log('list',recommendations.list)
    //   // var newList = _.map(, function(rec) {
    //   //   return rec.id === action.recId ? {...rec,grade: action.grade} : rec;
    //   // });
    //   var newList = _.merge(action.userRecs,recommendations.list)
    //
    //   // console.log('newList',newList)
    //
    //   return {
    //     ...recommendations,
    //     list: newList,
    //   }

      // -------------------------------------------
      // right now this pulls from a listener on the appInitialized fn
      case REFRESH_MY_RECS:

        return {
          ...recommendations,
          list: action.myRecs,
          myRecs: action.myRecs,
        }

      // -------------------------------------------
      // right now this pulls from a listener on the appInitialized fn
      case REFRESH_GIVEN_RECS:

        return {
          ...recommendations,
          // list: action.myRecs,
          givenRecs: action.givenRecs,
        }

    // -------------------------------------------
    default:
      return recommendations;
  }
}
