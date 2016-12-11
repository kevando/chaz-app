import _ from 'lodash';

const initialState = {
  personIndex: 1,
  people: [],
  actionQueue: [],
  isConnected: false,

  recommendations: [],
  uid: null, // outside user object for now

};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case 'INC_PERSON_INDEX':
      return Object.assign({}, state, {
        personIndex: state.personIndex + 1,
      });
    case 'SAVE_PERSON':
      return Object.assign({}, state, {
        people: [action.person].concat(state.people),
      });
    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    case 'ADD_TO_ACTION_QUEUE':
      return Object.assign({}, state, {
        actionQueue: state.actionQueue.concat([action.payload]),
      });
    case 'REMOVE_FROM_ACTION_QUEUE':
      return Object.assign({}, state, {
        actionQueue: _.without(state.actionQueue, action.payload),
      });
    case 'SET_USER_ID':
      return Object.assign({}, state, {
        uid: action.uid,
      });
    case 'SAVE_RECOMMENDATION':
      return Object.assign({},state, {
        recommendations: [action.recommendation].concat(state.recommendations),
      });

    default:
      return state;
  }
}

export default reducer;
