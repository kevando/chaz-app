'use strict';
import React, { Component } from 'react';
const styles= require('../styles/styles.js');
const constants = styles.constants;
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

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
