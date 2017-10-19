import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';

import Dashboard from './Dashboard';
import Welcome from './Welcome'

import { Actions } from 'react-native-router-flux';

class DashboardContainer extends Component {

  componentWillMount() {
    //tmp
    // if(this.props.showOnboarding)
    //   Actions.push('Hello')
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.recommendations),
    };
  }


  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {

    const { showOnboarding } = this.props;

    if(showOnboarding) {
      return (
        <Welcome
          {...this.props}
          {...this.state}
          onNewRecPress={() => Actions.push('InputStack')}
        />
      )
    } else {
      return (
        <Dashboard
          {...this.props}
          {...this.state}
          onNewRecPress={() => Actions.push('InputStack')}
        />
      )
    }


  }
}

export default DashboardContainer;
