import { combineReducers } from 'redux'

import app from './app/reducer';
import counter from './counter/reducer';
import recs from './rec/reducer';
import recr from './recr/reducer';
import onboard from './onboard/reducer';

const reducers = {
  app,
  counter, // still used for some light testing
  recs,
  recr,
  onboard,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  // if (action.type === 'USER_LOGOUT') { // can probly get rid of this
  //   state = undefined // Totally clear state when user logs out
  // }
  console.log('%c REDUX STATE:', 'color: blue',state);
  console.log('%c REDUX ACTION:', 'color: blue',action)
  return appReducer(state, action)
}

export default rootReducer;
