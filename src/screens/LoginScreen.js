import React, {Component } from 'react';
import {
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  StyleSheet,
  PropTypes,
  Easing,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';
import * as counterActions from '../reducers/counter/actions';
import * as onboardActions from '../reducers/onboard/actions';
import GlobalStyle from '../style/Style';
import Emoji from 'react-native-emoji';

// const timer = require('react-native-timer');
import timer from 'react-native-timer';

// this is a traditional React component connected to the redux store
class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authResponse: '',
      authenticated: false,
      pulse: new Animated.Value(1),
      canProceedToLogin: false,
    }
    this.props.navigator.toggleNavBar({to: 'hidden', animated: false });
  }
  componentWillUnmount() {
    // clear all timers
    timer.clearTimeout(this);
    timer.clearInterval(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.app.has('authData'))
      this.setState({authenticated:true});
  }

  componentWillUpdate(nextProps,nextState) {
    // console.log('next state',nextState)
    if(nextState.canProceedToLogin && nextState.authenticated){
      console.log('CLEAR ALL TIMERS, AND PROCEED TO LOGIN');
      // clear all timers
      timer.clearTimeout(this);
      timer.clearInterval(this);
      this.props.dispatch(appActions.changeAppRoot('after-login'));
    }
  }


  pulseOnce() {
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
    ]).start();
  }

  render() {

    let { pulse } = this.state;
    let animatedHeartStyles = {transform: [{scale: pulse}]}

    return (
      <View style={styles.container}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500',color:'#fff',fontSize:100}}>chaz</Text>
        </Text>

        <View style={styles.animationContainer}>
          <Animated.View style={[styles.animatedView,animatedHeartStyles]}>
          <TouchableOpacity style={styles.heartButton} onPress={ this.onHeartPress.bind(this) }>
              {this.renderHeart()}
          </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={styles.purpleText}>
          <Text style={{fontWeight: '100',color:'#fff'}}>{this.state.authResponse}</Text>
        </Text>

      </View>
    );
  }

  renderHeart(){
    return <Text style={{fontSize: 90,textAlign:'center'}}><Emoji name="yellow_heart" /></Text>
  }

  onHeartPress(){ // this fn does way too much now
    if(this.state.authResponse == 'Authenticating...')
      return;

    this.setState({authResponse:'Authenticating...'});
    this.props.dispatch(appActions.login());

    this.setState({canProceedToLogin:true});

    // this.pulseOnce();
    // //
    // timer.setTimeout( this, 'loginTimeout', () => {
    //   this.setState({authResponse:'Something went wrong, probably no internet'});
    //   timer.clearInterval(this,'pulseInterval');
    // } , 10000);
    //
    // timer.setTimeout( this, 'minimumWait', () => {
    //   this.setState({canProceedToLogin:true});
    // } , 3000);
    //
    // // Now pulse at least 2 times before proceeding to the login page
    // timer.setInterval(this, 'pulseInterval', () => {
    //   this.pulseOnce();
    //   // console.log('Pulse Interval')
    // } , 3000);

  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 130,
    backgroundColor: GlobalStyle.constants.colors[0],
    alignItems:'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
  },
  purpleText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color:GlobalStyle.constants.colors[0]
  },
  heartButton: {
    // backgroundColor: 'red',
    // width: 130,
    flexDirection: 'column',
    justifyContent: 'center',
    // textAlign: 'center',

    marginTop:10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop:15,
    paddingBottom:15,
    color: '#fff',//Style.constants.colors[0],

  },

  // animation styles

  animationContainer: {
    // borderWidth:1,
    // borderColor:'red',
    height:150,

  }
});


LoginScreen.defaultProps = {
  hasPulse: true,
  growTo:1.2,
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter,
    app: state.app,
    onboard: state.onboard
  };
}


export default connect(mapStateToProps)(LoginScreen);
