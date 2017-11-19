import { combineReducers } from 'redux'

import user from './user/reducer';
import recommendations from './recommendations/reducer';
import reminders from './reminders/reducer';
import friends from './friends/reducer';
import app from './app/reducer';
import feelings from './feelings/reducer';
import categories from './categories/reducer'

const reducers = {
  user,
  recommendations,
  reminders,
  friends,
  app,
  feelings,
  categories
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

  if (action.type === 'PURGE_DATA') {
    state = undefined;
  }
  // console.log('%c REDUX STATE:', 'color: blue',state);
  // console.log('%c REDUX ACTION:', 'color: blue',action);
  return appReducer(state, action)
}

export default rootReducer;
