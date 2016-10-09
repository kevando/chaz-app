import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
// import * as firebaseActions from '../reducers/firebase/actions';
import {colors} from '../style/Global';

// new meteor stuff
import Button from '../components/button';
// import ddpClient from '../ddp';
import Meteor, { createContainer } from 'react-native-meteor';
Meteor.connect('ws://localhost:3000/websocket');//do this only once
import { changeSignInStatus, initializeApp } from '../reducers/app/actions';

class Welcome extends Component {

  constructor(props){
    super(props);
    this.state = {
      status: ''
    }
  }

  componentDidUpdate(nextProps) { //todo change this after auth is improved
    // var user = this.props.app.get('user');
    // if(user && this.state.loading){ // Refresh screen with auth data
    //   var uid = user.get('uid');
    //   var welcomeMessage = user.get('welcomeMessage');
    //   this.setState({status:welcomeMessage,uid:uid,loading:false});
    // }
  }


  handleSignIn() {
    this.setState({status:'authenticating with server'});
    var userId = this.props.deviceId;


    let params = {
      user: {
        username: userId
      },
      password: userId//ddpClient.sha256(password)
    };

    Meteor.call("login",[params], (err, res) => {
      console.log('err',err)
      console.log('res',res)
      if(err)
      this.handleCreateAccount();
      // ddpClient.onAuthResponse(err, res);
      // cb && cb(err, res)
    });

    //
    // ddpClient.loginWithUsername(userId, userId, (error, res) => {
    //   if (error) {
    //     // User exists, so lets create the account
    //     this.handleCreateAccount();
    //   } else {
    //     this.props.changedSignedIn(true);
    //     this.props.initializeApp();
    //
    //   }
    // });
  }

  handleCreateAccount() {
    var userId = this.props.deviceId;

    let params = {
      username: userId,
      password: userId,//ddpClient.sha256(password)
      // consider adding profile data here.
    };

    Meteor.call('createUser', [params], (err, res) => {
      console.log('create user err',err)
      console.log('create user res',res)
    });

    // ddpClient.signUpWithUsername(userId, userId, (error, res) => {
    //   if (error) {
    //     this.setState({error: error.reason})
    //   } else {
    //     this.props.changedSignedIn(true);
    //     this.props.initializeApp();
    //   }
    // });
  }

  render(){

    let signIn, createAccount;

    if (this.props.connected) { // todo. do I need to check this?
      signIn = <Button text="Lets get started" onPress={() => this.handleSignIn()} />;
    }

    return (
      <View style={styles.container}>
        <Text style={{fontWeight:'500',color:'#fff',fontSize:100,textAlign:'center'}} >chaz</Text>
        <Text style={{fontWeight:'400',color:'#fff',fontSize:20,textAlign:'center'}} >The fastest way to save recommendations.</Text>
        <Text style={{color:'#fff'}}>{this.state.status}</Text>

        <View style={styles.buttons}>
          {signIn}
        </View>

        <View style={{position:'absolute',bottom:25,left:5}}>
          <Text style={styles.debugText}>{process.env.NODE_ENV}</Text>
          <Text style={styles.debugText}>Connected: {this.props.connected}</Text>
          <Text style={styles.debugText}>{this.props.deviceId}</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop:80,
    alignItems: "center",
    backgroundColor: colors.purple,
  },
  button: {
    backgroundColor:'#fff',
    padding:15,
    color: colors.purple,
  },
  buttons: {
    flexDirection: 'row'
  },
  error: {
    color: 'red',
    height: 20
  },
  debugText: {
    fontWeight:'400',
    color:'#fff',
    fontSize:14,
  }
});


const mapStateToProps = (state) => {
  return {
    deviceId: state.app.get('deviceId'),
    connected: true // todo this should connect to this.ddp.connected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changedSignedIn: (status) => dispatch(changeSignInStatus(status)),
    initializeApp: () => dispatch(initializeApp())
  }
}

// export default connect(mapStateToProps)(Welcome);
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
