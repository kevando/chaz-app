'use strict'; // not sure why

// Trying this router to see how it works
import Router from 'react-native-simple-router';
import React, { Component, Navigator, View, Styles, TouchableHighlight, NavigatorIOS, AlertIOS, Text, StyleSheet, ActivityIndicatorIOS } from 'react-native'; // need View in order to stack the Header with DufineApp
import { bindActionCreators } from 'redux';


import ListPage from './ListPage'; //


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
    this.openUsernamePopup = this.openUsernamePopup.bind(this);
    this.attemptCreateUser = this.attemptCreateUser.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
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
    console.log("Auth Failed!", error);

  } else {
    console.log("Authenticated successfully with payload:", authData);
    this.props.actions.setAuthData(authData);
  }
  // return 'kev'
}
  attemptLogin(username) {
    this.setState({loading:true})
    fireRef.authWithPassword({
      email    : username+'@kevinhabich.com',
      password : '1'
    }, this.authHandler);

  }
  handleCreateUser(error, authData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with user:", authData);
      // console.log(username);
      this.attemptLogin(this.state.username);
    }
  }
  attemptCreateUser(username) {
    this.setState({username:username});
    fireRef.createUser({
      email: username+"@kevinhabich.com",
      password: "1"
    }, this.handleCreateUser);
  }

  openUsernamePopup() {
    AlertIOS.prompt(
      'Enter your username',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'SignUp', onPress: (text) => {this.attemptCreateUser(text)}},
        {text: 'LogIn', onPress: (text) => {this.attemptLogin(text)}},


      ],
    );
  }
  attemptLogout() {
    fireRef.unauth(); // this does nothing, but why? i must have coded this weird
    this.props.actions.setAuthData({});
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
    // console.log('ChazApp Render. redux state = ',this.props.state);
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
      // User is logged out so show the login screen
      // refactor todo this should be its own component
      return (
        <View style={{backgroundColor:"#24CE84",flex:1}}>
          <Text style={{color:"#fff", fontWeight:'500',fontSize:25,marginTop:120,textAlign:'center'}}>WELCOME TO CHAZ</Text>
          <Text style={{color:'#fff', fontWeight:'400',fontSize:15,margin:20,textAlign:'center'}}>Chaz helps you to develop deeper connections to the humans in your life by encouraging you follow up on their recommendations and advice.</Text>
        <TouchableHighlight onPress={this.openUsernamePopup} >
          <Text style={{backgroundColor:'blue',color:'white',padding:10,margin:30,textAlign:'center'}}>GET STARTED</Text>
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
