import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

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


class Welcome extends Component {

  constructor(props){
    super(props);
    this.state = {
      status: 'idk',uid: 'none',loading:true
    }
  }

  componentDidMount() {
    const {dispatch, subscribe} = this.props.store; // Redux passed in app.js

    dispatch(firebaseActions.checkForAppUser()); // dispatches CREATE_USER
    subscribe(this.onStoreUpdate.bind(this));
  }

  // redux store
  onStoreUpdate() {
    // Dispatch to the route the first time we notice user data in state
    // const user = this.props.store.getState().app.get('user');
    var uid = this.props.store.getState().app.getIn(['user','uid']);
    var welcomeMessage = this.props.store.getState().app.get('welcomeMessage');

    this.setState({status:welcomeMessage,uid:uid,loading:false});

  }

  render(){

    return (
      <View style={styles.container}>
        <Text>User ID: <Text style={{fontWeight:'500',color:'blue'}}>{this.state.uid}</Text></Text>
        <Text>status: <Text style={{fontWeight:'600',color:'green'}}>{this.state.status}</Text></Text>

        {( this.state.loading
          ?
          <Text>Loading from server</Text>
          :
          <Button onPress={Actions.recList}>Go to Rec List Screen</Button>
        )}

      </View>
    );
  }

}



//
module.exports = Welcome;
