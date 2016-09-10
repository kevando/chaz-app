import React, { Component } from 'react';
import {View, Text, StyleSheet,LayoutAnimation, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import * as firebaseActions from '../reducers/firebase/actions';
import {colors} from '../style/Global';

var SPRING_CONFIG = {tension: 7, friction: 3}; //Soft spring
var BUTTON_OFFSET = 250;

class Welcome extends Component {

  constructor(props){
    super(props);
    // dispatches CREATE_APP_USER
    this.props.dispatch(firebaseActions.checkForAppUser());
    this.state = {
      pan: new Animated.ValueXY(), // not totally sure what this does but it is needed for animation to work
      status: 'loading...',
      uid: 'no uid',
      loading:true
    }
  }

  componentDidUpdate(nextProps) { //todo change this after auth is improved
    var user = this.props.app.get('user');
    if(user && this.state.loading){ // Refresh screen with auth data
      var uid = user.get('uid');
      var welcomeMessage = user.get('welcomeMessage');
      this.setState({status:welcomeMessage,uid:uid,loading:false});
      this.triggerButtonAnimation(); // trying this animation for now
    }
  }

  componentWillMount() {
   // Animate creation
  //  LayoutAnimation.spring(); // I guess this fades it in.. not sure how or why
 }
  triggerButtonAnimation() {
    Animated.sequence([
      Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: -BUTTON_OFFSET} //animate from off screen bottom
      }),
      // Animated.spring(this.state.pan, {
      //     ...SPRING_CONFIG,
      //     toValue: {x: 111 - SQUARE_DIMENSIONS, y: 111 - SQUARE_DIMENSIONS} // animated to bottom right
      // })
    ]).start(); //cb would make this repeat
  }

  getButtonStyle() {
    return [{transform: this.state.pan.getTranslateTransform()}];
  }


  render(){

    return (
      <View style={styles.container}>
          <Text style={{fontWeight:'500',color:'#fff',fontSize:100,textAlign:'center'}} >chaz</Text>
        {( this.state.loading
          ?
          <Text>Loading from server</Text>
          :
          <View>
            <Button style={styles.button} onPress={this.onButtonPress}>Get Started</Button>
          </View>
        )}
        <View style={{position:'absolute',bottom:25,left:5}}>
          <Text style={{fontWeight:'400',color:'#fff'}}>NODE_ENV: {process.env.NODE_ENV}</Text>
          <Text style={{fontWeight:'400',color:'#fff'}}>Server Response: {this.state.status}</Text>
          <Text style={{fontWeight:'100',color:'#fff'}}>{this.state.uid}</Text>
        </View>
      </View>
    );
  }
  onButtonPress() {
    Actions.recommendations()
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
    // hacking this animation
    // marginTop:BUTTON_OFFSET
  },
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Welcome);
