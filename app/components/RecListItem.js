'use strict';
import React, { Component } from 'react';
var _ = require('lodash');
var TimeAgo = require('react-native-timeago');
var dateFormat = require('dateformat');
const styles = require('../styles/styles.js');
// const RecrView = require('./RecrView'); dont use for now
import { StyleSheet, Text, View, TouchableHighlight, AlertIOS } from 'react-native';

class RecListItem extends React.Component {

  constructor(props) {
    super(props);
    this.onAddHumanPress = this.onAddHumanPress.bind(this);
    this.onRecrPress = this.onRecrPress.bind(this);
  }

  onAddHumanPress() {
    var options = Array();
    options.push({text: 'Add New',  onPress: (recr) => {this.props.createNewRecrFunction(recr,this.props.rec)}    });
    var recrs = this.props.recrs.map((recr) => {
      options.push({text: recr.name, onPress: () => {this.props.assignExistingRecrFunction(recr,this.props.rec)} });
    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });

    AlertIOS.prompt('Who recommended this?', null, options);
  }
  onRecrPress() {
    const recrs = this.props.recrs;
    var recr = this.props.rec.recr;
    var recr = _.find(recrs, ['_key', recr._key]);
    // console.log('calculated recr',recr)
    var nav = this.props.navigator;
    nav.push({
      title: recr.name,
      passProps: { recr: recr },
      component: RecrView,
    })
  }
  getDisplayDate(datetime) {
    var displayDate = 'asdf';
    var t = new Date(datetime);

    //"2015-06-21T06:24:44.124Z"
    // displayDate = dateFormat(t, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    displayDate = dateFormat(t, "yyyy-MM-dd hh:MM.sss");

    return t;
  }
  render() {

    const rec = this.props.rec;
    var onPress = this.props.onPress;
    if(rec.recr == null)
      onPress = this.onAddHumanPress

    return (
      <TouchableHighlight onPress={onPress}>

        <View style={styles.li}>
          <View style={styles.liLeft}>
            <Text style={styles.recListItemRecTitle}>{rec.title}</Text>
            {( rec.grade != null
              ? <Text style={styles.recListItemRecGradeMissing}>{rec.grade} Stars</Text>
              : <Text style={styles.recListItemRecGradeMissing}>No Grade</Text>
            )}

            <TimeAgo style={styles.recListItemRecGradeMissing} time={this.getDisplayDate(rec.createdAt) } />

          </View>
          <View style={styles.liRight}>
          {( rec.recr != null
            ? <TouchableHighlight onPress={this.onRecrPress}>
                <Text style={styles.liTextRight}>{rec.recr.name}</Text>
              </TouchableHighlight>

            : <TouchableHighlight onPress={this.onAddHumanPress}>
                <Text style={styles.recListItemRecHumanMissing}>+ Recommender</Text>
              </TouchableHighlight>
          )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = RecListItem;
