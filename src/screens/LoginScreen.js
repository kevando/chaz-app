import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';
import * as appActions from '../reducers/app/actions';
import Loading from '../components/LoadingComponent';

// this is a traditional React component connected to the redux store
class LoginScreen extends Component {

  static propTypes = {
    str: PropTypes.string.isRequired,
    obj: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {loading: false, authResponse: 'f'}
  }

  render() {

    if(this.state.loading)
      return <Loading message="Logging In" />

    return (
      <View style={{flex: 1, padding: 20}}>
      <Text style={styles.text}>
        <Text style={{fontWeight: '500'}}>Welcome to chaz</Text>
      </Text>
        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>Counter: </Text> {this.props.counter.count}
        </Text>

        <TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
          <Text style={styles.button}>Increment Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onLoginPress.bind(this) }>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          <Text style={{fontWeight: '100',color:'red'}}>{this.props.app.authError}</Text>
        </Text>

        <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
        <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
        <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
        <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>
        <Text style={{fontWeight: '500'}}>Array of arrays prop: {JSON.stringify(this.props.obj.arr2)}</Text>

      </View>
    );
  }
  onIncrementPress() {
    this.props.dispatch(counterActions.increment());
  }
  onLoginPress() {
    // this.setState({loading:true})
    this.props.dispatch(appActions.login());
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
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
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
