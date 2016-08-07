import React, {Component } from 'react';
import {
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  StyleSheet,
  PropTypes,
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
    this.state = {loading: false, authResponse: ''}
    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false
    });
  }
  componentWillUnmount() {
    timer.clearTimeout('loginTimeout');
  }

  componentWillReceiveProps(nextProps) {
    // this fires when redux updates
    // I think I use this for updating title and such
    console.log('new props. should have the auth data',nextProps)
  }

  render() {


    return (
      <View style={{flex: 1, paddingTop: 130,backgroundColor: GlobalStyle.constants.colors[0],alignItems:'center'}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500',color:'#fff',fontSize:100}}>chaz</Text>
        </Text>

        <TouchableOpacity style={styles.heartButton} onPress={ this.onHeartPress.bind(this) }>
            {this.renderHeart()}
        </TouchableOpacity>

        <Text style={styles.purpleText}>
          <Text style={{fontWeight: '100',color:'#fff'}}>{this.state.authResponse}</Text>
        </Text>


      </View>
    );
  }

  renderHeart(){
    return <Text style={{fontSize: 90,textAlign:'center'}}><Emoji name="yellow_heart" /></Text>
  }

  onHeartPress(){
    this.setState({authResponse:'Authenticating...'});

    timer.setTimeout( 'loginTimeout',
      () => {
        this.setState({authResponse:'Something went wrong, probably no internet'})
      }, 7000
    );

    this.props.dispatch(appActions.login());

    // now run an interval of the pulsing heart, every second
    // check each second if I am authenticated and can change ROOT



    //
    // // Check if we should show onboarding message
    // if(this.props.onboard.get('currentStep') == 0){
    //   // then increment the step, so we see a pop up
    //   this.props.dispatch(onboardActions.increment());
    // }




    // timer.setTimeout( 'loginTimeout',
    //   () => {
    //     this.setState({authResponse:'something went wrong, probably no internet'})
    //   },5000
    // );

  }

}

const styles = StyleSheet.create({
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

    marginTop:50,
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
    app: state.app,
    onboard: state.onboard
  };
}


export default connect(mapStateToProps)(LoginScreen);
