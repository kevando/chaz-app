import _ from 'lodash';

import * as t from '../actionTypes'


const initialState =
  {
    unfinished: {},
    list: [ ],
    myRecs: [],
    givenRecs: [],
    filter: 'all',
    inbox: [],
    outbox: [],
    openRecs: [],
  };

export default function recs(recommendations = initialState, action = {}) {
  // console.log(action)
  // console.log('Reducer Action: ',action)
  // console.log('Reducer recommendations: ',recommendations)

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
        ...action.payload,
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
          // friend: action.friend,
          from: action.friend, // not always tho
        }
      }

    // -------------------------------------------
    case t.SET_UNFINISHED_DATA:
      return {
        ...recommendations,
        unfinished: {
          ...recommendations.unfinished,
          ...action.data
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
      // right now this pulls from a listener on the appInitialized fn
      case t.REFRESH_MY_RECS:
        return {
          ...recommendations,
          // list: action.myRecs,
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
      // -------------------------------------------
      // right now this pulls from a listener on the appInitialized fn
      case t.REFRESH_INBOX:
        return {
          ...recommendations,
          inbox: action.inbox,
          openRecs: action.openRecs,
        }

      // case t.SET_USER_DATA:
      //   return {
      //     ...recommendations,
      //     ...action.data,
      //   }

    // -------------------------------------------
    default:
      return recommendations;
  }
}
