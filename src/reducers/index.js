import { combineReducers } from 'redux'

import app from './app/reducer';
// import counter from './counter/reducer';
import recs from './rec/reducer';
import recrs from './recr/reducer';
import onboard from './onboard/reducer';
// import messages from './messages/reducer';
import categories from './categories/reducer';
import widgets from './widgets/reducer';
import posts from './post/reducer';

const reducers = {
  app,
  // counter, // still used for some light testing
  recs,
  recrs,
  onboard,
  // messages,
  posts,
  categories,
  widgets,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  // if (action.type === 'USER_LOGOUT') { // can probly get rid of this
  //   state = undefined // Totally clear state when user logs out
  // }
  // console.log('%c REDUX STATE:', 'color: blue',state);
  // console.log('%c REDUX ACTION:', 'color: blue',action);
  return appReducer(state, action)
}

export default rootReducer;
