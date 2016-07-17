import React, {Component } from 'react';
import {
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import * as appActions from '../reducers/app/actions';
// import Loading from '../components/LoadingComponent';
import Style from '../style/Style';

// this is a traditional React component connected to the redux store
class LoginScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {loading: false, authResponse: 'f'}
    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false
    });

  }

  render() {
    // For testing
    // this.props.dispatch(appActions.login('bro'));

    // if(this.state.loading)
    //   return <Loading message="Logging In" />

    return (

      <View style={{flex: 1, paddingTop: 130,backgroundColor: Style.constants.colors[0],alignItems:'center'}}>
      <Text style={styles.text}>
        <Text style={{fontWeight: '500',color:'#fff',fontSize:100}}>chaz</Text>
      </Text>


        <TouchableOpacity style={styles.button} onPress={ this.onLoginPress.bind(this) }>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          <Text style={{fontWeight: '100',color:'red'}}>{this.props.app.authError}</Text>
        </Text>


      </View>
    );
  }

  onLoginPress() {
    // this.setState({loading:true})
    // this.props.dispatch(appActions.login('bro'));

    var options = Array();
    options.push({text: 'LOG IN',  onPress: (username) => { this.props.dispatch(appActions.login(username)) }    });
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
  button: {
    // backgroundColor: '#fff',
    width: 130,
    flexDirection: 'column',
    justifyContent: 'center',

    marginTop:40,
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
