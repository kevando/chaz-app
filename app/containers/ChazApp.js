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
    
    this.openUsernamePopup = this.openUsernamePopup.bind(this);

  }

  componentDidMount() {
    this.props.actions.startListeningToAuth();
  }


  openUsernamePopup() {
    AlertIOS.prompt(
      'Enter your username',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'SignUp', onPress: (text) => {this.props.actions.attemptCreateUser(text)}},
        {text: 'LogIn', onPress: (text) => {this.props.actions.attemptLogin(text)}},


      ],
    );
  }


  render() {
    console.log('state in ChazApp',this.props.state)
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
              onLeftButtonPress: this.props.actions.logUserOut,
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
