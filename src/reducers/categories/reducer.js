import * as types from './actionTypes';
import { Map, List } from 'immutable';


const initialState = List([

  {id:'all',label: 'All'},
  {id:'movie',label: 'Movies'}

]);

export default function categories(categories = initialState, action = {}) {

  switch (action.type) {

    default:
      return categories;
  }
}
