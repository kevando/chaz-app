import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';
import Dashboard from './Dashboard';
import Welcome from './Welcome'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import firebase from 'react-native-firebase';

class DashboardContainer extends Component {
  constructor(props) {
    super(props)
    // this.state = {activeFilter: 'everything'}
    this._changeActiveFilter = this._changeActiveFilter.bind(this)
    this._onNewRecPress = this._onNewRecPress.bind(this)
  }
  componentWillMount() {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {activeFilter: 'Everything'};
  }
  componentDidMount() {
    // TMP!!
    // Actions.push('Register')
    // Actions.push('Profile')
    // Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('FriendView',{friend: this.props.friends[0]})
  }

  componentWillUpdate() {
    // LayoutAnimation.easeInEaseOut(); // todo figure this out later
  }

  _changeActiveFilter(activeFilter) {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // const filteredRecs = _.filter(this.props.recommendations, function(rec) { return rec.category.title == 'sdf'; });
    // _.filter(this.props.recommendations, (rec) => {return rec.category.title == "Movie"})

    this.setState({activeFilter})
  }
  _onNewRecPress() {
    // console.log('new rec')
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid})
    Actions.push('InputStack')
  }



  render() {
    // console.log('Dash',this.props.user)
    // console.log(firebase.auth())
    const { showOnboarding } = this.props;

    if(showOnboarding) {
    // if(false) {
      return (
        <Welcome
          {...this.props}
          {...this.state}
          onNewRecPress={this._onNewRecPress}
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
