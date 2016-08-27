
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {constants} from '../style/Global';
import KeyboardSpacer from 'react-native-keyboard-spacer';

var {
  height: deviceHeight
} = Dimensions.get("window");


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
        offset: new Animated.Value(100),
        fadeAnim: new Animated.Value(0), // init opacity 0
    };

    this.closeHandler = this.closeHandler.bind(this)

  }

  componentDidMount() {
      Animated.timing(this.state.offset, {
          duration: 150,
          toValue: 0
      }).start();

      Animated.timing(          // Uses easing functions
     this.state.fadeAnim,    // The value to drive
     {toValue: 1,duration:200}            // Configuration
   ).start();
  }

  closeHandler() {
    // console.log('closeHandler')
    Animated.timing(this.state.offset, {
        duration: 150,
        toValue: -100
    }).start();

    Animated.timing(          // Uses easing functions
   this.state.fadeAnim,    // The value to drive
   {toValue: 0,duration:200}            // Configuration
 ).start(Actions.pop);

  }


  render(){
    // console.log('popup props data',this.props.data);
    var Child = this.props.data;
    return (
      <Animated.View style={[styles.background,{opacity:this.state.fadeAnim}]}>
        <Animated.View style={[styles.container,{transform: [{translateY: this.state.offset}]}]}>
          <Child closeHandler={this.closeHandler} passProps={this.props.passProps} />

        </Animated.View>
        <KeyboardSpacer/>
      </Animated.View>
    );
  }
}
var styles = StyleSheet.create({
    background: {
      position: "absolute",
      top:0,
      bottom:0,
      left:0,
      right:0,
      backgroundColor:"transparent",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"rgba(102,102,102,0.8)",
    },
    container: {
      padding:20,
      margin:20,
      
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"white",
      borderColor:constants.colors[0],
      borderWidth:7
    },
});
