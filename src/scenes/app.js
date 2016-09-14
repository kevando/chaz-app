import React, { Component } from 'react';
import {View, Text, StyleSheet, AlertIOS} from "react-native";
import { connect } from 'react-redux';

import ddpClient from '../ddp';
import { changeSignInStatus } from '../reducers/app/actions';

import SignIn from './signIn';
import SignOut from './signOut';

import Loading from '../components/Loading';

import timer from 'react-native-timer'; // add some delays so we know whats going on

import {
  Reducer,
  Router,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './';

// probly time to move this code elsewhere


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
      this.state = {loading: true, showLoading:true}; // Always default to loading. add some timeout here.
  }

  componentWillReceiveProps(newProps){
    // console.log('newProps',newProps);
    if (newProps.signedIn) {
      // return <SignOut />
      console.log('User is now signed in!')
      // Actions.recommendations(); this causes an error -_-
    } else {
      console.log('User is now signed out!')
      Actions.welcome(); // dont like keeping this here if I cant do it above
      // return <SignIn />
    }
  }

  componentWillMount() {

    ddpClient.connect((error, wasReconnect) => {

      if (error) {
        console.log('connect error', error);
      } else {
        ddpClient.loginWithToken((err, res) => {
          // had to change loginWithToken in the ddp to invoke a cb. not sure if thats correct
          if (!err){
            this.props.changedSignedIn(true);
            Scenes['recommendations'].initial = true;
          } else {
            Scenes['welcome'].initial = true;
          }

          timer.setTimeout(this,'meteordelay',() => this.setState({loading: false}),1200);

        });
      }
    });
  }

  render() {
    // Dont render the app until I have user data back from Meteor connection
        if(this.state.loading)
          return(<Loading message="Connecting to Meteor Server" />)


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
    signedIn: state.app.get('signedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changedSignedIn: (status) => dispatch(changeSignInStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
