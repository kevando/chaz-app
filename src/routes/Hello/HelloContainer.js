import React, { Component } from 'react';

import Hello from './Hello';
import Routes from '../../config/routes';

// var Mixpanel = require('react-native-mixpanel');
import Mixpanel from 'react-native-mixpanel';

//Init Mixpanel SDK with your project token
Mixpanel.sharedInstanceWithToken('976ab99070f5bcf9c9255e282330f0fe');

class HelloContainer extends Component {

  render() {

    Mixpanel.track("App Loaded");

    const { navigator } = this.props;

    return (
      <Hello
        onButtonPress={() => navigator.push(Routes.getNewRecommendationRoute())}
      />
    );
  }

}

export default HelloContainer;
