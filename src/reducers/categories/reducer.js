import { List } from 'immutable';

const initialState = List([

  {id:'all',label: 'All'},
  {id:'movie',label: 'Movies'},
  {id:'tv',label: 'TV Shows'},
  {id:'music',label: 'Music'}

]);

export default function categories(categories = initialState, action = {}) {

  switch (action.type) {

    default:
      return categories;
  }
}
