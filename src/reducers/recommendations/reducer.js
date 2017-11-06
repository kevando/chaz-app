import _ from 'lodash';
// import {
//   SET_TITLE,
//   SET_FRIEND_ID,
//   SAVE_RECOMMENDATION_SUCCESS,
//   SET_REMINDER,
//   // DELETE_RECOMMENDATION,
//   SET_STATUS,
//   SET_FILTER,
//   SET_GRADE,
//   UPDATE_RECOMMENDATION,
//   REFRESH_MY_RECS,
//   REFRESH_GIVEN_RECS,
//   SET_REC_TO,
//   INIT_REC,
// } from '../actionTypes';

import * as t from '../actionTypes'


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
  // // console.log(recommendations)
  // // console.log(recommendations.unfinished)
  switch (action.type) {
  //   // case t.'ADD_REC':
  //     return {
  //       ...recommendations,
  //       myRecs: [action.rec].concat(recommendations.myRecs)
  //     }
  // -------------------------------------------
  case t.INIT_REC:
    return {
      ...recommendations,
      unfinished: {
        ...action.payload, // contains to/from
        status: 'unfinished',
        createdAt: Date.now(),

      }
    }
    // -------------------------------------------
    case t.SET_TITLE:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          title: action.title,
        }
      }

    // -------------------------------------------
    case t.SET_FRIEND:
      console.log(action)
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          friendId: action.friend.id,
          friendName: action.friend.name
        }
      }

    // -------------------------------------------
    // Saved rec to firestore, clear unfinished
    case t.SAVE_RECOMMENDATION_SUCCESS:
      return {
        ...recommendations,
        unfinished: {},
      }

    // -------------------------------------------
    case t.UPDATE_RECOMMENDATION: // TEMP!!!!!! DEV
    // console.warn('UPDATE REC')
      var newList = _.map(recommendations.myRecs, function(rec) {
        return rec.id === action.rec.id ? action.rec : rec; // better way to do this for sure
      });

      return {
        ...recommendations,
        myRecs: newList,
      }
    // -------------------------------------------
    case t.SET_REMINDER:
      // alert(action.reminderDate)

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,reminder: action.reminderDate} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    // case t.DELETE_RECOMMENDATION:
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
    case t.SET_STATUS:

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,status: action.status} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    case t.SET_FILTER:

      return {
        ...recommendations,
        filter: action.filter,
      }

    // -------------------------------------------
    case t.SET_GRADE:

      var newList = _.map(recommendations.list, function(rec) {
        return rec.id === action.recId ? {...rec,grade: action.grade} : rec;
      });

      return {
        ...recommendations,
        list: newList,
      }

    // -------------------------------------------
    // Take recs from firestore and add them here
    // case t.SYNC_USER_RECS:
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
      case t.REFRESH_MY_RECS:

        return {
          ...recommendations,
          list: action.myRecs,
          myRecs: action.myRecs,
        }

      // -------------------------------------------
      // right now this pulls from a listener on the appInitialized fn
      case t.REFRESH_GIVEN_RECS:

        return {
          ...recommendations,
          // list: action.myRecs,
          givenRecs: action.givenRecs,
        }

      case t.SET_USER_DATA:
        return {
          ...recommendations,
          ...action.data,
        }

    // -------------------------------------------
    default:
      return recommendations;
  }
}
