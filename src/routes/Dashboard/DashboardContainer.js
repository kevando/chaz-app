import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';
import Dashboard from './Dashboard';
import Welcome from './Welcome'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class DashboardContainer extends Component {
  constructor(props) {
    super(props)
    // this.state = {activeFilter: 'everything'}
    this._changeActiveFilter = this._changeActiveFilter.bind(this)
    // this._onFilterPress = this._onFilterPress.bind(this)
  }
  componentWillMount() {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {activeFilter: 'Everything'};
  }
  componentDidMount() {
    // TMP!!
    // Actions.push('RecView',{rec: this.props.recommendations[0]})
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _changeActiveFilter(activeFilter) {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // const filteredRecs = _.filter(this.props.recommendations, function(rec) { return rec.category.title == 'sdf'; });
    // _.filter(this.props.recommendations, (rec) => {return rec.category.title == "Movie"})

    this.setState({activeFilter})
  }

  render() {

    const { showOnboarding } = this.props;

    if(showOnboarding) {
    // if(false) {
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
          changeActiveFilter={this._changeActiveFilter}

        />
      )
    }


  }
}

export default DashboardContainer;
