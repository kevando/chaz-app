import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PropTypes, Easing } from 'react-native';
import Emoji from 'react-native-emoji';
const styles = require('../styles/styles.js');

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
    return <Emoji name={styles.constants.hearts[heartIndex]} />
  }
  getRandomBackgroundColor(){
    var bgIndex = Math.floor((Math.random() * 4));
    return {backgroundColor: styles.constants.colors[bgIndex]}
  }

  render() {
    let { pulse } = this.state;
    let animatedHeartStyles = {transform: [{scale: pulse}]}

    return (
      <Animated.View style={[styles.loadingView,animatedHeartStyles,this.getRandomBackgroundColor()]}>
        {this.getRandomHeart()}
      </Animated.View>
    )
  }
}

Loading.defaultProps = {
  hasPulse: true,
  growTo: 2.1,
}


module.exports = Loading;
