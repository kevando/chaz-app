import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as appActions from './reducers/app/actions';
import * as firebaseActions from './reducers/firebase/actions';

import Chaz from './scenes/Chaz';


//  redux STUFF
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs'; // i forget what this does
import { connect } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
const reducer = storage.reducer(rootReducer,merger);

import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

const middleware = storage.createMiddleware(engine);


const createStoreWithMiddleware = applyMiddleware(thunk,middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);
// load(store); // I now call this in the constructor

// engine.save({}); // This clears the state from local storage



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};

    store.subscribe(this.onStoreUpdate.bind(this));
    // could probly also plug this into the REDUX_SAVE action

    load(store)
      .then((newState) => {
        console.log('newState',newState);
        // If newState is empty, the user is opening app for the first time
        // Otherwise it will return user data from redux
        // REDUX_LOAD action  gets call that triggers this .then statement (i think)
        // And that causses onStoreUpdate to run BEFORE the following code.
        // not sure if that fucks anything up

        if(Object.keys(newState).length === 0){ // newState = {}
          //no user data, so create one
          // but make sure user is not in firebase with data
          store.dispatch(firebaseActions.checkForAppUser()); // dispatches CREATE_USER

          // otherwise onStoreUpdate will run and set the route
        } else {
          store.dispatch({type:'SET_WELCOME_MESSAGE',message:'0: User was previously found in redux'})
        }
      })
      .catch(() => console.warn('Failed to load previous state'));

  }
  onStoreUpdate() {
    // Dispatch to the route the first time we notice user data in state
    const user = store.getState().app.get('user');
    console.log('USER in onStoreUpdate',user);

    // Only continue if User object is not empty
    if(Object.keys(user).length === 0)
      return;

    if (this.currentUser != user) {
      console.log('This is our first time hearing about user data! APP IS GOOD TO GO!');
      this.currentUser = user;
      this.setState({loading:false});
    }
  }

  getInitialRoute(){
    return 'recList';
  }

  render() {
    // I think I dont want to render anything until I have user data in Redux state
    if(this.state.loading)
      return(<View><Text>LOADING APP PLEASE WAIT</Text></View>)

    return (
      <Provider store={store}>
        <Chaz initialRoute={ this.getInitialRoute() } />
      </Provider>
    );
  }
}


export default App;
