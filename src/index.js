import React, { Component } from 'react';
// import { AsyncStorage } from 'react-native';
// import Meteor, { createContainer } from 'react-native-meteor';

// import LoggedOut from './layouts/LoggedOut';
// import LoggedIn from './layouts/LoggedIn';
// import Loading from './components/Loading';
// import settings from './config/settings';
//
// Meteor.connect(settings.METEOR_URL);

import { Provider } from 'react-redux';
import configureStore from './store';

// tmp
import {View,Text} from 'react-native';
import NameList from './NameList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
   if (this.state.isLoading) return null;
   return (
     <Provider store={this.state.store}>
       <NameList />
     </Provider>
   );
  }
}

export default App;





//
// const RNApp = function(props) {
//   const { status, user, loggingIn } = props;
//
//   if (status.connected === false || loggingIn) {
//     return <Loading text='Connecting & Authenticating' heart='yellow' paddingTop={64} />;
//   } else if (user !== null) {
//     return <LoggedIn />;
//   } else {
//     return <LoggedOut />;
//   }
// };

// RNApp.propTypes = {
//   status: React.PropTypes.object,
//   user: React.PropTypes.object,
//   loggingIn: React.PropTypes.bool,
// };
//
// export default createContainer(() => {
//   return {
//     status: Meteor.status(),
//     user: Meteor.user(),
//     loggingIn: Meteor.loggingIn(),
//   };
// }, RNApp);
