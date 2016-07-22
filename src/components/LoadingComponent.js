import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PropTypes, Easing } from 'react-native';
import Emoji from 'react-native-emoji';
const GlobalStyle = require('../style/Style');

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pulse: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.startPulse();
  }

  componentDidUpdate(prevProps) {
    console.log('when am i called?');
    if (!prevProps.hasPulse && this.props.hasPulse) {
      this.startPulse();
    }
  }

  startPulse() {
    if (!this.props.hasPulse) {
      return;
    }

    Animated.sequence([
      Animated.timing(this.state.pulse, {
        toValue: this.props.growTo,
        duration: 300,
        delay: 400,
      }),
      Animated.timing(this.state.pulse, {
        toValue: 1,
        easing: Easing.easeOut,
        duration: 700,
      }),
      Animated.delay(300 * Math.random()),
    ]).start(this.startPulse.bind(this));
  }
  getRandomHeart(){
    var heartIndex = Math.floor((Math.random() * 4));
    return <Emoji name={GlobalStyle.constants.hearts[heartIndex]} />
  }
  getRandomBackgroundColor(){
    var bgIndex = Math.floor((Math.random() * 4));
    return {backgroundColor: GlobalStyle.constants.colors[bgIndex]}
  }


  render() {
    let { pulse } = this.state;
    let animatedHeartStyles = {transform: [{scale: pulse}]}

    return (
      <View style={styles.loadingContainer}>
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.animatedView,animatedHeartStyles]}>
            {this.getRandomHeart()}
          </Animated.View>
        </View>
        <Text style={{fontSize:10,color:'#888'}}>{this.props.message}</Text>
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

Loading.defaultProps = {
  hasPulse: true,
  growTo:1.8,
}



module.exports = Loading;
