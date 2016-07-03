import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, AlertIOS } from 'react-native';

// Set up Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chazActions from '../actions/chazActions';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {loading:false}
    this.openUsernamePopup = this.openUsernamePopup.bind(this);
  }

  openUsernamePopup() {
    AlertIOS.prompt(
      'Enter your username', null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'Log In', onPress: (text) => {this.props.actions.attemptLogin(text)}},
      ],
    );
  }


  render() {
    return (
      <View style={{backgroundColor:"#24CE84",flex:1}}>
        <Text style={{color:"#fff", fontWeight:'500',fontSize:25,marginTop:120,textAlign:'center'}}>WELCOME TO CHAZ</Text>
        <Text style={{color:'#fff', fontWeight:'400',fontSize:15,margin:20,textAlign:'center'}}>Chaz helps you to develop deeper connections to the humans in your life by encouraging you follow up on their recommendations and advice.</Text>
      <TouchableHighlight onPress={this.openUsernamePopup} >
        <Text style={{backgroundColor:'blue',color:'white',padding:10,margin:30,textAlign:'center'}}>GET STARTED</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.props.actions.attemptLogin('bro')} >
        <Text style={{backgroundColor:'blue',color:'white',padding:10,margin:30,textAlign:'center'}}>Login as Bro</Text>
      </TouchableHighlight>
      </View>



    );
  }


}

// module.exports = Welcome;

// I do not understand any of this..
export default connect(state => ({
  state: state.chaz // Grabs data from the reducer
}),
(dispatch) => ({
  actions: bindActionCreators(chazActions, dispatch)
})
)(Welcome);
