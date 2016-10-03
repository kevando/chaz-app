import * as types from './actionTypes';
import Immutable, {Map,List} from 'immutable';

const initialState = List([



  {position: 1, label: 'Friends', component: 'Friends'},
  {position: 0, label: 'Uncategorized', component: 'Uncategorized'},
  {position: 1, label: 'Needs a Recommender', component: 'NeedsRecr'},
  {position: 1, label: 'Queue', component: 'Queue'},

]);

export default function reducer(widgets = initialState, action = {}) {

  switch (action.type) {

    default:
      return widgets;
  }
}
