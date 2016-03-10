'use strict';
const React = require('react-native');
const styles= require('../styles/styles.js');
const constants = styles.constants;
const { StyleSheet, Component, Text, View, TouchableHighlight } = React;

class ActionButton extends Component {
  render() {
      return (
        <View style={styles.action}>
          <TouchableHighlight
            underlayColor={constants.actionColor}
            onPress={this.props.onPress}>
            <Text style={styles.actionText}>{this.props.title}</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
  module.exports = ActionButton;
