import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";


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

// import * as appActions from '../reducers/app/actions';
import * as onboardActions from '../reducers/onboard/actions';

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


class Chaz extends Component {

  constructor(props){
    super(props);
    this.state = {loading: true};
    // console.log('chaz props',this.props)

    this.props.store.subscribe(this.onStoreUpdate.bind(this));


  }

  // FOR ONBOARDING LOGIC
  onStoreUpdate() {
    var {store} = this.props;
    var onboard = store.getState().onboard;
    // console.log('onStoreUpdate onboard JS',onboard.toJS());

    if (onboard.get('showPopup')) {
      var stepData = onboard.getIn(['steps',onboard.get('currentStep')]);
      Actions.onboardPopup(stepData);
      store.dispatch({type: 'SHOW_ONBOARD_POPUP',payload:false});
      store.dispatch({type: 'INCREMENT_CURRENT_STEP'}); // this should probly also take care of setting onboard to false
    }

}


  render(){
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
