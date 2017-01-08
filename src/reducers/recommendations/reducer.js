import _ from 'lodash';

import {
  SET_TITLE
} from './actionTypes';


const initialState =
  {
    unfinished: {title:'empty'},
    list: [
      {title: 'chaz', recr: 'Kevin'},
    ],

  };

  // const initialStatee =
  //   [
  //       {title: 'chaz', recr: 'Kevin'},
  //     ]



export default function recs(recommendations = initialState, action = {}) {

  switch (action.type) {

    case SET_TITLE:
      // alert(action.title)
      return {
      ...recommendations,
      unfinished: {title: 'dude'}
      }



    default:
      return recommendations;
  }
}
