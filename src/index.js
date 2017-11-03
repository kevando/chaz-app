import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './config/store';

import Chaz from './layouts/Chaz';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
   if (this.state.isLoading)
    {
      console.log('index.js Loaded, but state is null')
      return null; // Do nothing until store is loaded
    }

    console.log('index.js Loaded, and state is ready')

   return (
     <Provider store={this.state.store}>
       <Chaz />
     </Provider>
   );
  }
}

export default App;
