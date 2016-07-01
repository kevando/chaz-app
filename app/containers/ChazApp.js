'use strict'; // not sure why

// Trying this router to see how it works
import Router from 'react-native-simple-router';
import React, { Component } from 'react';
import { Navigator, View, Styles, TouchableHighlight, NavigatorIOS, AlertIOS, Text, StyleSheet, ActivityIndicatorIOS } from 'react-native'; // need View in order to stack the Header with DufineApp
import { bindActionCreators } from 'redux';
import RecList from './RecList'; //
import RecrList from './RecrList';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';
import * as styles from '../styles/styles.js';

class ChazApp extends Component {

  constructor(props) {
    super(props);
    this.state = {loading:false}
    this.openUsernamePopup = this.openUsernamePopup.bind(this);
  }

  componentDidMount() {
    this.props.actions.startListeningToAuth();
    this.props.actions.listenForRecs();
    this.props.actions.listenForRecrs(); // moving this here otherwise
  }


  openUsernamePopup() {
    AlertIOS.prompt(
      'Enter your username',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        // {text: 'SignUp', onPress: (text) => {this.props.actions.attemptCreateUser(text)}},
        {text: 'Log In', onPress: (text) => {this.props.actions.attemptLogin(text)}},


      ],
    );
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
          ref="nav"
          style={styles.navigatorContainer}
          initialRoute={{
            component: RecList,
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
