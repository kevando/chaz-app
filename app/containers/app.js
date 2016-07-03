// Core React
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// Redux stuff
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'; // Middleware that lets us  return promises in redux (I think)

import * as reducers from '../reducers';
import ChazApp from './ChazApp';

// use local storage
import * as storage from 'redux-storage'; //

import createLogger from 'redux-logger';
const logger = createLogger();

//const reducer = storage.reducer(combineReducers(reducers)); // this is new from stoage package
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');
const middleware = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(thunk, middleware, logger)(createStore);

// do not use local storage
const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// use this either storage or not
const store = createStoreWithMiddleware(reducer);


// Use Local Storage
const load = storage.createLoader(engine);
// engine.save({}); // This clears the state from local storage
// load(store);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
  }

  render() {
    // Redux initial state will always default to loading
    if(this.state.loading)
          load(store).then((newState) => this.setState({loading:false}));

          if(this.state.loading){
            return(
              <View><Text>Loading</Text></View>
            )
          }
        return(
        <Provider store={store}>
          <ChazApp />
        </Provider>
      );
  }
}
