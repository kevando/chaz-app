'use strict';
// var React = require('react-native');
import React, { Component } from 'react';
const styles = require('../styles/styles.js')
const _ = require('lodash');
const { View, TouchableHighlight, Text, AlertIOS } = React;
class RecrListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onAddHumanPress = this.onAddHumanPress.bind(this);
  }

  onAddHumanPress() {
    AlertIOS.prompt(
      'Who recommended this?',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'Addold', onPress: (text) => {this.props.itemRef.update({recr: text})} },
        {text: 'Add', onPress: (recr) => {this.props.assignRecrFunction(recr,this.props.rec)} },

      ],
    );
  }
  render() {

    const recr = this.props.recr;
    console.log(recr)
    // console.log('render listitem',rec);
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <View style={styles.liLeft}>
            <Text style={styles.recListItemRecTitle}>{recr.name}</Text>
            <Text style={styles.recListItemRecGradeMissing}>Recommendations: {_.size(recr.recs)}</Text>
          </View>
          <View style={styles.liRight}>
          {( recr.score != null
            ? <Text style={styles.liTextRight}>{recr.score}%</Text>
            : <Text style={styles.liTextRight}>No score</Text>
          )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = RecrListItem;
