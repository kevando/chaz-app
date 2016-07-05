import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  visible: [
    {_key: 'asdfa',title: 'great gatsby'},
    {_key: 'asdfafsda',title: 'shawshank redemption'}
  ]
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
      return state.merge({
        count: state.count + 1
      });
    case types.DECREMENT:
      return state.merge({
        count: state.count - 1
      });
    default:
      return state;
  }
}
