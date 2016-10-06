import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PropTypes, Easing } from 'react-native';
import Emoji from 'react-native-emoji';
import {colors, hearts} from '../style/Global';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { pulse: new Animated.Value(1) };
  }

  componentDidMount() {
    this.startPulse();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.hasPulse && this.props.hasPulse) {
      this.startPulse();
    }
  }

  componentWillUnmount(){
    console.log('loading.js unmounted')
  }

  continuePulse(){
    this.startPulse()
    // todo only return on even pulses
  }

  startPulse() {
    // console.log('start pulse'); this is going on forever
    // todo probly change that


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
    ]).start(this.continuePulse.bind(this));
  }
  getRandomHeart(){
    var heartIndex = Math.floor((Math.random() * 4));
    return <Emoji name={hearts[heartIndex]} />
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
        <Text style={{fontSize:14,color:'#888'}}>{this.props.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor:colors.lightGrey,
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  animationContainer: {
    height:50,
  }
})

Loading.defaultProps = {
  hasPulse: true,
  growTo:1.8,
}

module.exports = Loading;
