import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';

import analyticsMiddleware from './middleware/analyticsMiddleware'

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(analyticsMiddleware,thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized()); // kick off auth listener
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
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
