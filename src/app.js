import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
// import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';
import * as counterActions from './reducers/counter/actions';
import analyticsMiddleware from './middleware/analyticsMiddleware'

import { registerScreens } from './screens';

/// ------------------------------------------------------
import * as storage from 'redux-storage'

// Import redux and all your reducers as usual

// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
// Note: A cusom merger function can be passed as second argument

import merger from 'redux-storage-merger-immutablejs';

// changing this up to add better "log out" functionality (per dan abramov)
import rootReducer from './reducers'; // this now combines the reducers

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

const middleware = storage.createMiddleware(engine);
// const middleware = storage.createMiddleware(engine,['ROOT_CHANGED']);

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(thunk,middleware)(createStore);
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

// load(store); // comment this out to not run async

// engine.save({}); // This clears the state from local storage

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
// load(store)
//     .then((newState) => {
//       console.log('Loaded state:', newState.counter.count);
//       // var registerScreens = require('./screens');
//       // registerScreens(store, Provider);
//       // store.subscribe(App.onStoreUpdate.bind(this));
//       App.afterReduxStoreLoaded();
//     })
//     .catch(() => console.log('Failed to load previous state'));


/// -------------------------------------------------------


// redux related book keeping (DEFAULT SHIT)
// const createStoreWithMiddleware = applyMiddleware(analyticsMiddleware,thunk)(createStore);
// const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);


// ----------------------------------------------------------

// screen related book keeping

registerScreens(store, Provider);








// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually

    store.subscribe(this.onStoreUpdate.bind(this));
    // store.dispatch(appActions.appInitialized()); // do this elsewhere now

    load(store)
      .then((newState) => {
        console.log('newState',newState);

        // does this do anything?
        store.dispatch(appActions.appInitialized());

        })
        .catch(() => console.warn('Failed to load previous state'));
  }


  onStoreUpdate() {
    const root = store.getState().app.get('root');
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'init':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'chaz.InitScreen',
            title: 'Initlializing',
            navigatorStyle: {}
          },
          passProps: {}
        });
        return;

      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'chaz.LoginScreen',
            title: 'Login',
            navigatorStyle: {}
          },
          passProps: {}
        });
        return;
      case 'after-login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'chaz.RecsScreen',
            title: '',
            navigatorStyle: {}
          },
          passProps: {}
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
