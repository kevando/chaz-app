import * as actionTypes from './actionTypes';

import ddpClient from '../../ddp';

var uuid = require('react-native-uuid');

export function setPosts(posts) {
  return {
    type: 'SET_POSTS',
    payload: posts,
  };

}








const addPostOptimistic = (post) => {
  return {
    type: 'ADD_POST_OPTMISTIC',
    payload: post
  };
};

const incrementCountConfirm = (count) => {
  return {
    type: 'INCREMENT_COUNT_CONFIRM',
    count,
  }
};

export const addPost = (title) => {
  return (dispatch, getState) => {

    var key = uuid.v1();
    var obj = {};
    obj[key] = {_id: key, title: title}
    // myArray.push(obj);


    dispatch(addPostOptimistic(obj));

    ddpClient.call('addPost', [{_id: key, title: title}], (err, res) => {
      // ddpClient.onAuthResponse(err, res);
      console.log('server responded')
      // cb && cb(err, res)
    });


    //
    // Meteor.call('Count.increment', (err, res) => {
    //   if (res) {
    //     dispatch(incrementCountConfirm(res.count));
    //   }
    // });
  };
};
