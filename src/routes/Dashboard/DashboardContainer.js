import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';

import Dashboard from './Dashboard';
import Routes from '../../config/routes';

class DashboardContainer extends Component {

  componentWillMount() {
    // super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.recommendations),
    };
  }


  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {

    return (
      <Dashboard
        {...this.props}
        {...this.state}
        onNewRecPress={() => this.props.navigator.push(Routes.getNewRecommendationRoute())}
      />
    );
  }
}

export default DashboardContainer;
