// import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

// import { ddpReducer } from 'redux-meteor-ddp';
// import { ddpReducer } from '../../redux-meteor-ddp';

import * as _ from 'lodash';

const initialState = {};

// const appReducer = (state = initialState, action) => {
export default function appReducer(posts = initialState, action = {}) {
  // console.log(action.type)
  switch (action.type) {
    case 'SET_POSTS':

    console.log('posts',action.payload)
    var newPosts = [];//posts.map(value => Object.assign({}, value));
    for (var i in action.payload) {

      newPosts.push(Object.assign({}, action.payload[i]))


  }
  console.log('newPosts',newPosts);
    return Object.assign({}, posts, newPosts);


    case 'ADD_POST_OPTMISTIC':


      // var newPosts = posts;
      // _.insert(newPosts, action.payload )
      // newPosts[action.payload._id] = action.payload;
       return _.merge({}, posts, action.payload);
      // return Object.assign({}, posts, newPosts );



    default:
      return posts;
  }
}


// const countInitialState = {
//   count: 0,
// };
//
// const countReducer = (state = countInitialState, action) => {
//   switch (action.type === '') {
//     case 'INCREMENT_COUNT_OPTMISTIC':
//       return Object.assign({}, state, { count: action.count + 1 });
//     case 'INCREMENT_COUNT_CONFIRM':
//       return Object.assign({}, state, { count: action.count });
//     default:
//       return state
//   }
// };
//
//
// export default combineReducers({
//   app: appReducer,
//   // count: countReducer,
//   // ddp: ddpReducer // add this back?
// });
