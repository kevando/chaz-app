import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

class Hearts extends Component {

  _renderHearts(count) {
    let hearts = ''
    for (i=0; i < count; i++ ) {
      hearts += '💙'
    }
    return hearts;
  }

  render() {
    const { rec } = this.props;

    if(!rec.grade) { return null; }

    return <Text>{this._renderHearts(rec.grade.value)}</Text>
  }

};

export default Hearts
