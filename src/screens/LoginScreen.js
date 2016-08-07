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

  render() {
    const count = this.props.counter.get('count'); // dev

    return (
      <View style={{flex: 1, paddingTop: 130,backgroundColor: GlobalStyle.constants.colors[0],alignItems:'center'}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500',color:'#fff',fontSize:100}}>chaz</Text>
        </Text>

        <TouchableOpacity style={styles.heartButton} onPress={ this.onHeartPress.bind(this) }>
            {this.renderHeart()}
        </TouchableOpacity>

        <Text style={styles.purpleText}>
          <Text style={{fontWeight: '100',color:'red'}}>{this.state.authResponse}</Text>
        </Text>

        <Text style={styles.purpleText}>
          <Text style={{fontWeight: '500'}}>Current Count: </Text> {this.props.counter.count}
        </Text>
        <Text style={styles.purpleText}>
          <Text style={{fontWeight: '500'}}>Get Current Count: </Text> {count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
          <Text style={styles.purpleText}>Increment Counter</Text>
        </TouchableOpacity>

      </View>
    );
  }

  onIncrementPress() {
    this.props.dispatch(counterActions.increment());
  }
  renderHeart(){
    return <Text style={{fontSize: 90,textAlign:'center'}}><Emoji name="yellow_heart" /></Text>
  }

  onHeartPress(){
    timer.setTimeout( 'loginTimeout',
      () => {
        this.setState({authResponse:'something went wrong, probably no internet'})
      },5000
    );
    this.props.dispatch(appActions.login())
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
    app: state.app
  };
}


export default connect(mapStateToProps)(LoginScreen);
