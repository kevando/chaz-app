import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
// import {Actions} from "react-native-router-flux";

import {
  // Scene,
  Reducer,
  Router,
  Switch,
  // Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './';

import {connect} from 'react-redux';

import * as appActions from '../reducers/app/actions';
import * as firebaseActions from '../reducers/firebase/actions';

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
    console.log('%c ROUTER STATE:', 'color: green',state);
    console.log('%c ROUTER ACTION:', 'color: green',action);
    return defaultReducer(state, action);
  };
};


class Chaz extends Component {

  constructor(props){
    super(props);

    // const {dispatch, subscribe} = this.props.store; // Redux passed in app.js
    // store.subscribe(this.onStoreUpdate.bind(this));


  }
  onStoreUpdate() {
    // // Dispatch to the route the first time we notice user data in state
    // const user = store.getState().app.get('user');
    // console.log('USER in onStoreUpdate',user);


  }

  componentWillUnmount() {
      console.log('Probably a better way to unsubscribe here...')
      // this.state.unsubscribe();
  }

  // redux store
  onStoreUpdate() {
    console.log('ON STOPRE UPDATE I NEED TO UNSUBSCRIBE!!!!')
    // Dispatch to the route the first time we notice user data in state
    // const user = this.props.store.getState().app.get('user');
    // var uid = this.props.store.getState().app.getIn(['user','uid']);
    // var welcomeMessage = this.props.store.getState().app.get('welcomeMessage');
    //
    // this.setState({status:welcomeMessage,uid:uid,loading:false});

  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps',nextProps);
    // This gets invoked after ADD_REC updates the state tree
    // Now pop router to recView
    // var rec = nextProps.recs.last();
    // Actions.recommendationFromAdd({rec:rec.toJS()});
  }

  render(){

    // dont think i want redux store in here. idk maybe. refactor welcome and remove it
    return (

      <Router
        createReducer={reducerCreate}
        scenes={Scenes}
        getSceneStyle={getSceneStyle}
      />

    );
  }

}

module.exports = Chaz;
