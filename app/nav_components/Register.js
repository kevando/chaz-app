import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import * as counterActions from '../reducers/counter/actions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// const Register = () => (
class Register extends Component {
  constructor(props) {
    super(props);
    console.log('props from RecList',this.props)


  }
  onIncrementPress() {
    this.props.dispatch(counterActions.increment())
  }
  render() {
    return(
      <View style={styles.container}>
        <Text>Register page</Text>
        <Text>Current Count: {this.props.counter.get('count')}</Text>
        <Button onPress={Actions.home}>Replace screen</Button>
        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={this.onIncrementPress.bind(this)}>increment</Button>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    counter: state.counter,
    rec: state.rec
  };
}

export default connect(mapStateToProps)(Register);
