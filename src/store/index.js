import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import immutableCheckMiddleWare from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk'

import reducers from '../reducers'; // changing from rootReducer
// const reducer = storage.reducer(rootReducer,merger);
// const createStoreWithMiddleware = applyMiddleware(thunk,storageMiddleware,firebaseSyncMiddleware,analyticsMiddleware,onboardMiddleware)(createStore);
// const store = createStoreWithMiddleware(reducer);

// import reducers from '../reducers/post/reducer';
import config from '../config';

import ddpClient from '../ddp';

// const loggerMiddleware = createLogger({
//   predicate: (getState, action) => config.env === 'dev'
// });

const middleWare = [];

if (config.env === 'dev') {
  middleWare.push(immutableCheckMiddleWare());
}

// middleWare.push(loggerMiddleware); // logger always has to be last
middleWare.push(thunk);

export default function makeStore() {
  const store = createStore(reducers, applyMiddleware(...middleWare));
  return store;
}
