import * as types from './actionTypes';
import * as Immutable from 'immutable';

var update = require('react/lib/update');

const initialState = Immutable.Map({
  loaded: false,
  all: [],
  visible: [],
  sort: 'newest',
  filters: Immutable.Map({
    grade: Immutable.Map({
      name: 'grade',
      active:'all',
      options: ['all','graded','ungraded'], // this needs to be a list for display
      queries: Immutable.Map({all:[1,2,3,4,5,undefined], graded:[1,2,3,4,5], ungraded:[undefined]})
    }),
  }),

});

export default function counter(state = initialState, action = {}) {

  switch (action.type) {

    case types.SET_LOADED:
      return state.set( 'loaded', action.loaded );

    case types.UPDATE_REC_LIST:
      return state.merge({
        all: action.payload
      });

    case types.UPDATE_REC_FILTER:
      console.log('newFilter',action.filter)

      return state.merge({
        filters: action.filter
      });



    case types.UPDATE_VISIBLE_REC_LIST:
      console.log('UPDATE_VISIBLE YO',state.get('gradeFilter'));
      var activeOption = state.getIn(['filters','grade','active']);
      var gradeFilter = state.getIn(['filters','grade']);
      var gradeFilterQuery = gradeFilter.get('queries');
      console.log('filterQuery',gradeFilterQuery.get(activeOption));
      var filterQuery = gradeFilterQuery.get(activeOption);
      var filteredList = state.get('all').filter(x => filterQuery.indexOf(x.get('grade')) != -1)
      var updatedList = filteredList.sort(function(a,b) {
        return b.get('createdAt') - a.get('createdAt');
      });
      return state.set( 'visible', updatedList );


    default:
      return state;
  }
}
