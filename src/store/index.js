import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from '../reducers'; // changing from rootReducer

const middleWare = [];
middleWare.push(thunk);

export default function makeStore() {
  const store = createStore(reducers, applyMiddleware(...middleWare));
  return store;
}
