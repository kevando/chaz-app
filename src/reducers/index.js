import { combineReducers } from 'redux'

import user from './user/reducer';
import recommendations from './recommendations/reducer';
// import recrs from './recr/reducer';
// import onboard from './onboard/reducer';
// import categories from './categories/reducer';
// import widgets from './widgets/reducer';

const reducers = {
  user,
  recommendations,
  // recrs,
  // onboard,
  // categories,
  // widgets,
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
