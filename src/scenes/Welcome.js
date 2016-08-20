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

    this.props.dispatch(firebaseActions.checkForAppUser()); // dispatches CREATE_USER

    this.state = {
      status: 'idk',uid: 'none',loading:true
    }
  }

  componentDidUpdate(nextProps) {
    var user = this.props.app.get('user');
    if(user && this.state.loading){ // Refresh screen with auth data
      var uid = user.get('uid');
      var welcomeMessage = nextProps.app.get('welcomeMessage');
      this.setState({status:welcomeMessage,uid:uid,loading:false});
    }
  }

  render(){

    console.log('this.props in RENDER',this.props);

    return (
      <View style={styles.container}>
        <Text>User ID: <Text style={{fontWeight:'500',color:'blue'}}>{this.state.uid}</Text></Text>
        <Text>status: <Text style={{fontWeight:'600',color:'green'}}>{this.state.status}</Text></Text>

        {( this.state.loading
          ?
          <Text>Loading from server</Text>
          :
          <Button onPress={Actions.recommendations}>Go to Rec List Screen</Button>
        )}

      </View>
    );
  }

}


// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Welcome);
