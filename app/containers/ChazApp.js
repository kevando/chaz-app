'use strict'; // not sure why

// Trying this router to see how it works
import Router from 'react-native-simple-router';
import React, { Component } from 'react';
import { Navigator, View, Styles, TouchableHighlight, NavigatorIOS, AlertIOS, Text, StyleSheet } from 'react-native'; // need View in order to stack the Header with DufineApp
import { bindActionCreators } from 'redux';

import * as chazActions from '../actions/chazActions';


import { connect } from 'react-redux';
import * as styles from '../styles/styles.js';

import Loading from '../components/Loading';
import Welcome from '../containers/Welcome';

import RecList from './RecList'; // not used
import RecrList from './RecrList';

import RecsView from '../containers/RecsView';

class ChazApp extends Component {

  constructor(props) {
    super(props);
    this.state = {loading:false}

  }

  componentDidMount() {
    console.log('kev',this.props.actions)
    this.props.actions.startListeningToAuth();
    // this.props.actions.listenForRecs(); //no idea how this is working w this commented out
    // this.props.actions.listenForRecrs();
  }


  onRightButtonPress() {
    this.refs.nav.push({
      title: 'Friends list',
      component: RecrList
    })
  }

  render() {
    // console.log('state in ChazApp',this.props.state)
    if(this.state.loading){
      return(
        <Loading />
      )
    }

    if (this.props.state.authData.token) { // this might be a bad way to do the conditional

      return (

        <NavigatorIOS
          ref="nav"
          style={styles.navigatorContainer}
          initialRoute={{
            component: RecsView,
              title: 'Chaz',
              passProps: { getNavigator: this.getNavigator },
              leftButtonTitle: 'Logout',
              onLeftButtonPress: this.props.actions.logUserOut,
              rightButtonTitle: 'Friends',
              onRightButtonPress: this.onRightButtonPress.bind(this)
          }}
        />

      );
    } else {
      // User is logged out so show the login screen
      // refactor todo this should be its own component
      return (
        <Welcome />
      );
    }


  }

}

// I do not understand any of this..
export default connect(state => ({
  state: state.chaz // Grabs data from the reducer
}),
(dispatch) => ({
  actions: bindActionCreators(chazActions, dispatch)
})
)(ChazApp);
