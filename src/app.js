import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  // Scene,
  Reducer,
  Router,
  Switch,
  // Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './scenes';


import * as appActions from './reducers/app/actions';
import * as firebaseActions from './reducers/firebase/actions';


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

engine.save({}); // This clears the state from local storage

// I guess this is required to get the nav dimensions right?
//
// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('%c ROUTER STATE:', 'color: green',state);
    console.log('%c ROUTER ACTION:', 'color: green',action);
    return defaultReducer(state, action);
  };
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true}; // Always do this before getting auth info

    // store.subscribe(this.onStoreUpdate.bind(this));
    // could probly also plug this into the REDUX_SAVE action

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

          Scenes['recList'].initial = true;
          this.setState({loading:false});
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

  render() {
    // I think I dont want to render anything until I have user data in Redux state
    if(this.state.loading)
      return(<View style={{paddingTop:200}}><Text>LOADING APP PLEASE WAIT</Text></View>)

    return (
      <Provider store={store}>
        <Router
          createReducer={reducerCreate}
          scenes={Scenes}
          store={store}
          getSceneStyle={getSceneStyle}
        />
      </Provider>
    );
  }
}


export default App;
