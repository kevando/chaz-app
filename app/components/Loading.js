import React, { Component } from 'react';
const styles= require('../styles/styles.js');
const constants = styles.constants;
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class Loading extends Component {
  render() {
      return (
        <View style={styles.action}>
          <Text style={{marginTop:200}}>LOADING</Text>
        </View>
      );
    }
  }
  module.exports = Loading;
