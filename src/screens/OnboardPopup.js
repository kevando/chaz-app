import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';
import * as GlobalStyle from '../style/Style';

// this is a traditional React component connected to the redux store
class OnboardPopup extends Component {
// eventually this will get all it's values passed via props

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.popupContainer} >

        <View style={{padding: 20}}>

          <Text style={styles.title}>
            Nice Job!
          </Text>
          <Text style={styles.text}>
            You just saved your first recommendation.
          </Text>
          <Text style={styles.text}>
            Things only get better from here..
          </Text>

          <TouchableOpacity onPress={ this.onButtonPress.bind(this) }>
            <Text style={styles.button}>Okay, I get it</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onButtonPress() {
    this.props.navigator.dismissLightBox();
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#fff',

  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'500',
    marginBottom: 10,
    marginTop:10,
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight:'200',
    marginBottom: 2,
    marginTop:2,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:20,
    backgroundColor: GlobalStyle.constants.colors[1],
    color: '#fff',
    padding: 10
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(OnboardPopup);
