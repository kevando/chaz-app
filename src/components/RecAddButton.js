import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {colors} from '../style/Global';

export default class AddRecButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text || 'Add New Recommendation' }
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={ this.props.onPress }>
        <Text style={styles.buttonText}>{this.state.text}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    height:50, // height of tab bar
    justifyContent:'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing:1.1,
  },
});
