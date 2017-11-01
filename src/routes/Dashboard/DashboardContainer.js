import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Hello from '../Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

class DashboardContainer extends Component {
  constructor(props) {
    super(props)
    this._changeActiveFilter = this._changeActiveFilter.bind(this)
    this._onNewRecPress = this._onNewRecPress.bind(this)
  }
  componentWillMount() {
    this.state = {activeFilter: 'Everything'};
  }
  componentWillMount() {

    // const { showOnboarding } = this.props;
    // if(showOnboarding)
    //   Actions.push('Walkthrough')

  }
  componentDidMount() {
    // TMP!!
    // Actions.push('NewRecLightbox')
    // Actions.push('Profile')
    // Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('FriendView',{friendObject: this.props.friends[2]})
  }

  _changeActiveFilter(activeFilter) {
    this.setState({activeFilter})
  }

  _onNewRecPress() {
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid})
    Actions.push('NewRecLightbox')
  }

  _onBrandNewRecPress = () => {
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid})
    Actions.push('NewRecLightbox',{walkthrough: true, category:'movie'})
  }

  render() {
    // console.log('Dash',this.props)
    // return null
    const { showOnboarding } = this.props;

    if(showOnboarding) {
    // if(false) {
      return (
        <Hello
          {...this.props}
          {...this.state}
          onNewRecPress={this._onBrandNewRecPress}
        />
      )
    } else {
      return (
        <Dashboard
          {...this.props}
          {...this.state}
          onNewRecPress={this._onNewRecPress}
          changeActiveFilter={this._changeActiveFilter}
          onNewGivenRecPress={() => Actions.push('InputStack',{given: true})}
        />
      )
    }
  }
}

export default DashboardContainer;
