import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PropTypes, Easing } from 'react-native';
import Emoji from 'react-native-emoji';
const GlobalStyle = require('../style/Style');

export default class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pulse: new Animated.Value(1)
    };
  }


  render() {

    return (
      <View style={styles.loadingContainer}>
        <Text style={{fontSize:15,color:'#444'}}>{this.props.notify}</Text>
        <Text style={{fontSize:10,color:'#888'}}>{this.props.guide}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor:GlobalStyle.constants.colors[4],
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  animationContainer: {
    // borderWidth:1,
    // borderColor:'red',
    height:50,

  }
})
