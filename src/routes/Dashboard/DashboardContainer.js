import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';

import Dashboard from './Dashboard';
import Routes from '../../config/routes';

class DashboardContainer extends Component {

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {

    return (
      <Dashboard
        {...this.props}
        onNewRecPress={() => this.props.navigator.push(Routes.getNewRecommendationRoute())}
      />
    );
  }
}

export default DashboardContainer;
