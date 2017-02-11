import * as types from './actionTypes';

const initialState = {
  step: 0
};

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    case types.INCREMENT:
      return state.step + 1

    case types.DECREMENT:
      return state.step + 1

    default:
      return state;
  }
}
