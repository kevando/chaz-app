'use strict'; // not sure why

// Trying this router to see how it works
import Router from 'react-native-simple-router';
import React, { Component, Navigator, View, Styles, TouchableHighlight, Text, StyleSheet, ActivityIndicatorIOS } from 'react-native'; // need View in order to stack the Header with DufineApp
import { bindActionCreators } from 'redux';

// const Firebase = require('firebase');

// import ListPage from '../containers/ListPage'; //
// import Auth from './Auth';
// import BackButton from '../components/BackButton'; //
// import SearchAndCompose from '../components/icons/SearchAndCompose';
// import GetSettings from '../components/icons/GetSettings';
// import AppSettings from '../components/AppSettings'

import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';

import * as styles from '../styles/styles.js';

const Firebase = require("firebase");
var fireRef = new Firebase('https://chaz1.firebaseio.com');




class ChazApp extends Component {


  constructor(props) {
    super(props);
    this.state = {loading:false}
    // Check auth state
    console.log('ChazApp Constructor!!!!!')

    this.attemptLogin = this.attemptLogin.bind(this);
    this.attemptLogout = this.attemptLogout.bind(this);
    this.authDataCallback = this.authDataCallback.bind(this);
    this.authHandler = this.authHandler.bind(this);

    // im guessing a listener makes this easier, but im deactivating it for now
    // this.startListeningToAuth();


  }
  authDataCallback(authData) { // this listener gets called BEFORE authHandler receives callback

    // console.log('AUTH LISTENER',this.props);
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      // Store token in redux state
      this.props.actions.setAuthData(authData);
    } else {
      console.log("User is logged out");
      this.props.actions.setAuthData({});
    }
  }


  startListeningToAuth() {
    fireRef.onAuth(this.authDataCallback);
  }

  authHandler(error, authData) {
    this.setState({loading:false})
  if (error) {
    console.log("Login Failed!", error);
    // this.props.actions.setAuthData({});
  } else {
    console.log("Authenticated successfully with payload:", authData);
    this.props.actions.setAuthData(authData);
  }
  // return 'kev'
}
  attemptLogin() {
    this.setState({loading:true})
    fireRef.authWithPassword({
      email    : 'test1@kevinhabich.com',
      password : '1'
    }, this.authHandler);

  }
  attemptLogout() {
    fireRef.unauth(); // this does nothing, but why? i must have coded this weird
    this.props.actions.setAuthData({});
  }

  getFirstRoute() {

    return authRoute;
  }

  render() {
    if(this.state.loading){
      return(
        <ActivityIndicatorIOS
        animating={this.state.loading}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
      )
    }
    console.log('ChazApp Render. redux state = ',this.props.state);
    // var authData = fireRef.getAuth();
    if (this.props.state.authData.token) { // this might be a bad way to do the conditional
      // console.log("User " + authData.uid + " is logged in with " + authData.provider);
      return (
        <View style={styles.containerTmp}>
          <Text>ChazApp You are logged in! Hello {this.props.state.authData.uid}</Text>
        <TouchableHighlight onPress={this.attemptLogout} >
          <Text>attemptLogout</Text>
        </TouchableHighlight>
        </View>
      );
    } else {
      // console.log("User is logged out");
      return (
        <View style={styles.containerTmp}>
          <Text>ChazApp Welcome</Text>
        <TouchableHighlight onPress={this.attemptLogin} >
          <Text>attemptLogin</Text>
        </TouchableHighlight>
        </View>
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
