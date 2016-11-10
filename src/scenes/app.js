import React, { Component } from 'react';
import {View, Text, StyleSheet, AlertIOS} from "react-native";
import { connect } from 'react-redux';

// import ddpClient from '../ddp';
import { initializeApp, changeSignInStatus } from '../reducers/app/actions';
import timer from 'react-native-timer'; // add some delays so we know whats going on

import {
  Reducer,
  Router,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './';



import { AsyncStorage } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('%c ROUTER STATE:', 'color: green',state);
    // console.log('%c ROUTER ACTION:', 'color: green',action);


    return defaultReducer(state, action);
  };
};

export class App extends Component {

  constructor(props) {
      super(props);
      // this.state = {loading: true }; // Always default to loading. add some timeout here.
  }

  componentWillReceiveProps(newProps){
    // this might fuck up the logged out process
    // console.log('newProps',newProps);
    if (newProps.initialized) {
      Actions.home();
      console.log('App has data and ready to go!');
    }
      // Actions.recommendations(); this causes an error -_-
    if (!newProps.signedIn && newProps.initialized) {
      console.log('User is now signed out!');
      // alert('sign user out!')
      Actions.logout(); // dont like restarting the app but whatever

    }
  }

  componentWillMount() {

    // custom loginwithtoken
    let params = { resume: '' };
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        // if (token) {
        if (false) {
          console.log('token found');
          // not sure why I need this now
          // process.nextTick = setImmediate;
          params.resume = token;
          Meteor.call("login", [params], function(err,res){
            console.log('call back from login attempt');
            console.log('call back from login attempt',res);
            console.log('call back from login attempt',err);
          });
        } else { // but what if there is no token?
          console.log('token NOT found');
          timer.setTimeout(this,'meteordelay',() => Actions.welcome() ,1200);

        }
      });






    //
    // ddpClient.connect((error, wasReconnect) => {
    //
    //   if (error) {
    //     console.log('connect error', error);
    //   } else {
    //     ddpClient.loginWithToken((err, res) => {
    //       // had to change loginWithToken in the ddp to invoke a cb. not sure if thats correct
    //       if (!err){
    //         // Initialize the app
    //         this.props.changeSignInStatus(true);
    //         this.props.initializeApp();
    //       } else {
    //         // Scenes['welcome'].initial = true;
    //         timer.setTimeout(this,'meteordelay',() => Actions.welcome() ,1200);
    //       }
    //
    //       // timer.setTimeout(this,'meteordelay',() => this.setState({loading: false}),1200);
    //
    //     });
    //   }
    // });
  }

  render() {

        return(
          <Router
            createReducer={reducerCreate}
            scenes={Scenes}
            getSceneStyle={getSceneStyle}
            store={this.props.store}
          />
      );

  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.app.get('signedIn'),
    initialized: state.app.get('initialized'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSignInStatus: (status) => dispatch(changeSignInStatus(status)),
    initializeApp: () => dispatch(initializeApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
