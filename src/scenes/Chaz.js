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
    console.log('%c ROUTER STATE:', 'color: green',state);
    console.log('%c ROUTER ACTION:', 'color: green',action);
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
    console.log('onStoreUpdate onboard JS',onboard.toJS());

    // Check the current onboarding step's conditions to proceed
    // If they are met, add next ACTION to the onboard action queue
    // fn()
    var recs = store.getState().recs;
    console.log(recs.size);
    if(recs.size == 0 && onboard.get('queue') == ''){
      console.log('there are no recs, set ADD_REC to the ob queue')
      store.dispatch(onboardActions.setQueue('ADD_REC'))

    }

    // now check if onboard steps are staggered because that means we need
    // to show user a popup with the pertinant onboarding information

    // Def want to make these names, currentStep something better
    if (onboard.get('currentStep') != onboard.get('step')) {
      console.log('Onboard is out of sync, so lets show the user some info and reconcile it!');
      store.dispatch({type: 'INCREMENT_STEP'}); // I think this will fuck with things
      this.setState({loading:false});
      Actions.onboardPopup('You added your first rec!');
    }

    // If there is an action in the onboard queue and it matches the current action

    // Actions.popup();
  // // Dispatch to the route the first time we notice user data in state
  // const user = store.getState().app.get('user');
  // console.log('USER in onStoreUpdate',user);
  //
  // // Only continue if User object is not empty
  // if(Object.keys(user).length === 0)
  //   return;
  //
  // if (this.currentUser != user) {
  //   console.log('This is our first time hearing about user data! APP IS GOOD TO GO!');
  //   this.currentUser = user;
  //   this.setState({loading:false});
  // }
}


  componentDidUpdate(nextProps) {
    // console.log('DidUpdate in chaz.js')
    // if(this.state.loading){ // Refresh screen with auth data
    //   // var uid = user.get('uid');
    //   // var welcomeMessage = nextProps.app.get('welcomeMessage');
    //   this.setState({loading:false});
    // }
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
