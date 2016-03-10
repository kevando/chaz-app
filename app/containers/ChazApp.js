'use strict'; // not sure why

// Trying this router to see how it works
import Router from 'react-native-simple-router';
import React, { Component, Navigator, View, Styles, TouchableHighlight, NavigatorIOS, Text, StyleSheet, ActivityIndicatorIOS } from 'react-native'; // need View in order to stack the Header with DufineApp
import { bindActionCreators } from 'redux';


import ListPage from './ListPage'; //
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

const listRoute = {
  name: 'Home',
  component: ListPage,
  // leftCorner: GetSettings,
  // rightCorner: SearchAndCompose
};


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
      email    : 'test2@kevinhabich.com',
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
        <NavigatorIOS
        style={styles.navigatorContainer}
          initialRoute={{
            component: ListPage,
              title: 'Chaz',
              passProps: { myProp: 'foo' },
              leftButtonTitle: 'Logout',
              onLeftButtonPress: this.attemptLogout,
          }}
        />
      );
    } else {
      // console.log("User is logged out");
      return (
        <View>
          <Text style={{fontWeight:'500',fontSize:20,marginTop:120,textAlign:'center'}}>WELCOME TO CHAZ</Text>
          <Text style={{fontWeight:'200',fontSize:15,margin:20,textAlign:'center'}}>Chaz helps you to develop deeper connections to the humans in your life by encouraging you follow up on their recommendations and advice.</Text>
        <TouchableHighlight onPress={this.attemptLogin} >
          <Text style={{backgroundColor:'blue',color:'white',padding:10,margin:30,textAlign:'center'}}>AUTHENTICATE AS TEST USER 2</Text>
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
