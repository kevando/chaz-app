import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Hello from '../Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

class DashboardContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }
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
    // Actions.push('Register')
    // Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('FriendView',{friend: this.props.friends[1]})
  }

  _changeActiveFilter = (activeFilter) => {
    this.setState({activeFilter})
  }

  _onNewRecPress = () => {
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid})
    Actions.push('NewRecLightbox')
  }

  _onBrandNewRecPress = (category) => {
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid, category})
    Actions.push('NewRecLightbox',{walkthrough: true, category})
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
