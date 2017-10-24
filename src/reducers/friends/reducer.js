import _ from 'lodash';

import {
  SAVE_FRIEND,
  ADD_REC_TO_FRIEND,
  DELETE_RECOMMENDATION,
  // SAVE_RECOMMENDATION,
  REFRESH_FRIENDS
} from '../actionTypes';


const initialState = [ ];
// const initialState = [ {name:'kevando'},{name:'kev'},{name:'jim'} ];

export default function recs(friends = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case SAVE_FRIEND:
      return friends.concat([action.friend])

    // -------------------------------------------
    // called from listener
    case REFRESH_FRIENDS:
      return action.myFriends

    // -------------------------------------------
    // case SAVE_RECOMMENDATION:
    //   // return friends
    //   console.log('friends',friends)
    //
    //   var newFriendsList = _.map(friends, function(friend) {
    //     return friend.id === action.rec.friend.id ? {...friend, recs: friend.recs ? [action.rec].concat(friend.recs) : [action.rec]} : friend; // better way to do this for sure
    //   });
    //   return newFriendsList

    // -------------------------------------------
    // case DELETE_RECOMMENDATION:
    //   // remove from
    //   // console.log('friends',friends)
    //
    //   var newFriendsList = _.map(friends, function(friend) {
    //     // return rec.id != action.recId;
    //     return friend.id === action.rec.friend.id ? {...friend, recs: friend.recs.length === 1 ? [] : _.filter(friend.recs, function(rec) {return rec.id != action.rec.id}) } : friend;
    //   });
    //
    //   return newFriendsList

    // -------------------------------------------
    default:
      return friends;
  }
}
