import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Style from '../../style/Style';
export default class AddRecButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={ this.props.onPress }>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Style.constants.colors[1],
    padding:15,
  },
  buttonText: {
    flex:1,
    color: '#fff',
    textAlign: 'center'
  },

});
