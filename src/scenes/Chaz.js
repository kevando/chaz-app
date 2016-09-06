import React, { Component } from 'react';
import {View, Text, StyleSheet, AlertIOS} from "react-native";
import Button from "react-native-button";

import {
  Reducer,
  Router,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './';
import {connect} from 'react-redux';
import Onboard from '../components/Onboard';
import * as onboardActions from '../reducers/onboard/actions';

// I dont like using a timer for this, but the scenes are all fucked up
// feels like a hack
const timer = require('react-native-timer');

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

    if(checkVersionMismatch(state,action)){
      alertNewVersion();
      return; // Dont return reducer
    }

    // Not sure if this will work, or if this should even be here
    checkOnboard(state,action);

    return defaultReducer(state, action);
  };
};

function checkVersionMismatch(state,action){ // returns true if there is a mismatch
  if(action.type == "REACT_NATIVE_ROUTER_FLUX_FOCUS" && state){  // only check for this action and if there is state
    var userAppVersion = state.store.getState().app.getIn(['user','appVersion']);
    if(userAppVersion != state.appVersion && action.scene.name != 'logout' && !(typeof userAppVersion === "undefined")) {
      return true;
    }
  }
  return false; // catch all
}

function alertNewVersion() {
  AlertIOS.alert('App Version has changed','Forcing an app restart',[{ text: 'Okay, log me out', onPress: () => Actions.logout() }]);
}

// this should probably exist inside a a component, but it works good here
function checkOnboard(state,action) {

  if(state && action){

    var reduxState = state.store.getState();
    var onboard = reduxState.onboard;
    var currentStep = onboard.get('currentStep');
    console.log(currentStep)
    console.log(onboard.get('steps').size)
    if(currentStep == onboard.get('steps').size) // We are at the final step, do not proceed
      return;
    var stepData = onboard.getIn(['steps',currentStep]).toJS();
    var {dataCondition, actionCondition} = stepData;


    if(actionCondition(action)){
      if(dataCondition(reduxState)){
        // using a delay because if the previous action is a closing modal, onboard never shows
        timer.setTimeout(this,'fuckingdelays', function(){Actions.popup({data: Onboard,passProps:stepData})}, 600);
      }
    }
  }

}


class Chaz extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router
        createReducer={reducerCreate}
        scenes={Scenes}
        getSceneStyle={getSceneStyle}
        store={this.props.store}
      />
    );
  }

}

module.exports = Chaz;
