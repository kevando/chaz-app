import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';
import * as Animatable from 'react-native-animatable'

class Hearts extends Component {

  _renderStars(count) {
    let hearts = ''
    for (i=0; i < count; i++ ) {
      hearts += '⭐️'
    }
    return hearts;
  }

  render() {
    const { rec, style } = this.props;

    if(!rec.grade) { return null; }

    return <Animatable.Text animation="lightSpeedIn" style={{...style}}>{this._renderStars(rec.grade.value)}</Animatable.Text>
  }

};

export default Hearts
