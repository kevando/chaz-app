import React, {
  Component,
} from 'react';

import Chaz from './scenes/Chaz'; // Container
import Loading from './components/Loading'; // todo remove after cleaning auth
//
//  redux STUFF
//
import * as storage from 'redux-storage';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

// Show redux-storage how to deal with immutablejs objects
import merger from 'redux-storage-merger-immutablejs';
// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
// Note: A cusom merger function can be passed as second argument
import rootReducer from './reducers';
const reducer = storage.reducer(rootReducer,merger);

// Now it's time to decide which storage engine should be used
//
// Note: The arguments to `createEngine` are different for every engine!
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state afer
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!

import onboardMiddleware from './middleware/onboardMiddleware';
import firebaseSyncMiddleware from './middleware/firebaseSyncMiddleware';

// blacklist any initialization actions. it fucks up loading the data
var blacklist = ['CREATE_APP_USER','LOAD_RECS_FROM_FIREBASE','LOAD_RECRS_FROM_FIREBASE'];
const storageMiddleware = storage.createMiddleware(engine,blacklist);

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(thunk,storageMiddleware,firebaseSyncMiddleware,onboardMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

// At this stage the whole system is in place and every action will trigger
// a save operation.
//
// BUT (!) an existing old state HAS NOT been restored yet! It's up to you to
// decide when this should happen. Most of the times you can/should do this
// right after the store object has been created.

// To load the previous state we create a loader function with our prepared
// engine. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(engine);

// load(store); // I now call this in the constructor

engine.save({}); // This clears the state from local storage

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.


import {Scenes} from './scenes'; // remove this after puttin init scene somewhere else todo

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true}; // Always do this before getting auth info

    load(store)
      .then((newState) => {
        console.log('newState',newState);
        // If newState is empty, the user is opening app for the first time
        // Show welcome screen

        if(Object.keys(newState).length === 0){ // newState = {}

          Scenes['welcome'].initial = true;
          this.setState({loading:false});
          //no user data, so create one
          // but make sure user is not in firebase with data
          // do this on welcome click
          // store.dispatch(firebaseActions.checkForAppUser()); // dispatches CREATE_USER
          // otherwise onStoreUpdate will run and set the route
        } else {
          // Otherwise it will return user data from redux
          // REDUX_LOAD action  gets call that triggers this .then statement (i think)
          // And that causses onStoreUpdate to run BEFORE the following code.
          // not sure if that fucks anything up
          // store.dispatch({type:'SET_WELCOME_MESSAGE',message:'0: User was previously found in redux'});
          Scenes['recommendations'].initial = true;
          this.setState({loading:false});
        }
      })
      .catch(() => console.warn('Failed to load previous state'));

  }

  render() {
    // Dont render the app until I have user data in Redux state
    if(this.state.loading)
      return(<Loading message="Loading the redux state" />)

    return (
      <Provider store={store}>
        <Chaz store={store} />
      </Provider>
    );
  }

}


export default App;
