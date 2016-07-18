import React, {Component } from 'react';
import {
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  StyleSheet,
  Easing,
  PropTypes,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import * as appActions from '../reducers/app/actions';
import * as counterActions from '../reducers/counter/actions';
// import Loading from '../components/LoadingComponent';
import Style from '../style/Style';

import Emoji from 'react-native-emoji';

// this is a traditional React component connected to the redux store
class InitScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {loading: false, authResponse: 'f'}
    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false
    });
    this.state = {
      pulse: new Animated.Value(1)
    };

  }
  componentDidMount() {
    var thisTmp = this;
    setTimeout(function(){
        // thisTmp.startPulse();
    },3000)

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
      Animated.delay(3000),
    ]).start(this.startPulse.bind(this));
  }

  render() {
    let { pulse } = this.state;
    let animatedHeartStyles = {transform: [{scale: pulse}]}

    const count = this.props.counter.get('count');

    // For testing
    // this.props.dispatch(appActions.login('bro'));

    // if(this.state.loading)
    //   return <Loading message="Logging In" />

    return (

      <View style={{flex: 1, paddingTop: 100,backgroundColor: Style.constants.colors[1],alignItems:'center'}}>
      <Text style={styles.text}>
        <Text style={{fontWeight: '500',color:'#fff',fontSize:100}}>INIT</Text>
      </Text>


        <TouchableOpacity style={styles.heartButton} onPress={ this.onLoginPress.bind(this) }>
          <Animated.View style={[styles.loadingView,animatedHeartStyles]}>
            {this.getHeart()}
          </Animated.View>

        </TouchableOpacity>
        <Text style={styles.text}>
          <Text style={{fontWeight: '100',color:'red'}}>{this.props.app.authError}</Text>
        </Text>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Current Count: </Text> {this.props.counter.count}
        </Text>
        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Get Current Count: </Text> {count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

      </View>
    );
  }

  onIncrementPress() {
    this.props.dispatch(counterActions.increment());
  }
  getHeart(){
    return <Text style={{fontSize: 50,textAlign:'center'}}><Emoji name="yellow_heart" /></Text>
  }

  onLoginPress() {
    // this.setState({loading:true})
    // this.props.dispatch(appActions.login('bro'));

    var options = Array();
    options.push({text: 'Continue',  onPress: (username) => { this.props.dispatch(appActions.login(username)) }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('What is your Name?', null, options);
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
  },
  heartButton: {
    // backgroundColor: 'red',
    // width: 130,
    flexDirection: 'column',
    justifyContent: 'center',
    // textAlign: 'center',

    marginTop:20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop:15,
    paddingBottom:15,
    color: '#fff',//Style.constants.colors[0],

  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter,
    app: state.app
  };
}
InitScreen.defaultProps = {
  hasPulse: true,
  growTo: 1.4,
}

export default connect(mapStateToProps)(InitScreen);
