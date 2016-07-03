'use strict';
// var React = require('react-native');
import React, { Component } from 'react';
const styles = require('../styles/styles.js')
const _ = require('lodash');
import { View, TouchableHighlight, Text, AlertIOS } from 'react-native';

//tmp
import RecList from '../containers/RecList';

class RecrListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    // this.refs.nav.push({
    // this.props.navigator.push({
    //   title: 'asdf list',
    //   component: RecrList
    // })
  }
  render() {

    const recr = this.props.recr;
    console.log(recr)
    // console.log('render listitem',rec);
    return (
      <TouchableHighlight onPress={this.onPress}>
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
