import React, { Component } from 'react';
import {View, Text, StyleSheet,} from "react-native";
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import * as firebaseActions from '../reducers/firebase/actions';
import * as GlobalStyle from '../style/Global';

var SPRING_CONFIG = {tension: 7, friction: 3}; //Soft spring
var BUTTON_OFFSET = 300;


import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

class Logout extends Component {

  constructor(props){
    super(props);
    // dispatches CREATE_APP_USER
    // this.props.dispatch(firebaseActions.checkForAppUser());
    // this.state = {
    //   pan: new Animated.ValueXY(), // not totally sure what this does but it is needed for animation to work
    //   status: 'loading...',
    //   uid: 'no uid',
    //   loading:true
    // }
  }


  componentWillMount() {
   // destroy data and redirect to login page
    // engine.save();
   this.props.dispatch({type:'USER_LOGOUT'});

   Actions.welcome();
 }


  render(){

    return (
      <View style={styles.container}>
        <View style={{top:170,flex:1}}>
          <Text style={{fontWeight:'500',color:'#fff',fontSize:100,textAlign:'center'}} >logged out</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyle.constants.colors[0],
  },
  button: {
    backgroundColor:'#fff',
    padding:15,
    color: GlobalStyle.constants.colors[1],
    // hacking this animation
    marginTop:BUTTON_OFFSET
  },
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Logout);
