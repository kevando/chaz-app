// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'
// import reducers from '../reducers'; // changing from rootReducer
//
// const middleWare = [];
// middleWare.push(thunk);
//
// export default function makeStore() {
//   const store = createStore(reducers, applyMiddleware(...middleWare));
//   return store;
// }



import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducer';

const middleWare = [thunk, createLogger()];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export default configureStore = (onComplete) => {
  const store = autoRehydrate()(createStoreWithMiddleware)(reducer);
  persistStore(store, { storage: AsyncStorage }, onComplete);
  // persistStore(store, { storage: AsyncStorage }, onComplete).purge();



  return store;
};
