import React, { Component } from 'react';

// Commenting out to do offline first
// import Meteor, { createContainer } from 'react-native-meteor';
// import settings from './config/settings';
// Meteor.connect(settings.METEOR_URL);

import { Provider } from 'react-redux';
import configureStore from './store';

import Chaz from './container/Chaz';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
   if (this.state.isLoading) return null; // Do nothing until store is loaded

   return (
     <Provider store={this.state.store}>
       <Chaz />
     </Provider>
   );
  }
}

export default App;
