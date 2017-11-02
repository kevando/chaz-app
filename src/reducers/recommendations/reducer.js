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
  UPDATE_RECOMMENDATION,
  REFRESH_MY_RECS,
  REFRESH_GIVEN_RECS,
  SET_REC_TO,
  INIT_REC,
} from '../actionTypes';

const Recs = [
  // {
  //   id: '1',
  //   title: 'pink floyd',
  //   friend: {name: 'Blake', id:'2'},
  //   category: 'music',
  // },
  // {
  //   id: '2',
  //   title: 'Shawshank Redemption',
  //   friend: {name: 'Kevin', id:'3'},
  //   category: 'movie',
  // },
  // {
  //   id: '3',
  //   title: 'Barbarsol',
  //   friend: {name: 'John Older Lions End', id:'3'},
  //   // category: 'music',
  // },
]

const UnfinishedRec = {
  // id: '1',
  title: 'Rockin like a hurricane',
  friend: {name: 'Blake', id:'2'},
  // category: 'music',
}
const initialState =
  {
    unfinished: UnfinishedRec,
    list: [ ],
    myRecs: Recs,
    // myRecs: [],
    givenRecs: [],
    filter: 'all'
  };

export default function recs(recommendations = initialState, action = {}) {
  // console.log(action)
  // console.log(recommendations)
  // console.log(recommendations.unfinished)
  switch (action.type) {
    case 'ADD_REC':
      return {
        ...recommendations,
        myRecs: [action.rec].concat(recommendations.myRecs)
      }
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
    case UPDATE_RECOMMENDATION: // TEMP!!!!!! DEV
    // console.warn('UPDATE REC')
      var newList = _.map(recommendations.myRecs, function(rec) {
        return rec.id === action.rec.id ? action.rec : rec; // better way to do this for sure
      });

      return {
        ...recommendations,
        myRecs: newList,
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
