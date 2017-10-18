import React, { Component } from 'react';
// import Mixpanel from 'react-native-mixpanel';

import Hello from './Hello';

//Init Mixpanel SDK with your project token
// Mixpanel.sharedInstanceWithToken('976ab99070f5bcf9c9255e282330f0fe');

class HelloContainer extends Component {

  static navigationOptions = {
    title: 'Welcomeee',
    // headerRight: <Button title="Info" />,
  };




  render() {

    const { navigate } = this.props.navigation;

    // Mixpanel.track("App Loaded");

    return (
      <Hello
        onPress={() => navigate('InputTitle',{user:'Lucy'})}
      />
    );
  }

}

export default HelloContainer;
