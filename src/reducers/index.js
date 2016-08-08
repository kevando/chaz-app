import { combineReducers } from 'redux'

import app from './app/reducer';
import counter from './counter/reducer';
import rec from './rec/reducer'; 
import recr from './recr/reducer';
import onboard from './onboard/reducer';

const reducers = {
  app,
  counter, // still used for some light testing
  rec,
  recr,
  onboard
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined // Totally clear state when user logs out
  }
  return appReducer(state, action)
}

export default rootReducer;
