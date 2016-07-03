
'use strict';
import React, { Component } from 'react';
const styles= require('../styles/styles.js');
const RecListItem = require('./RecListItem');
const RecList = require('../containers/RecListt');
const constants = styles.constants;
import { StyleSheet, Text, View, TouchableHighlight,ScrollView } from 'react-native';

class RecrView extends Component {


  constructor(props) {
    super(props);
    this.renderRecList = this.renderRecList.bind(this);
  }

  renderRecList() {
    console.log('thisprops recs',this.props.recr.recs)
    const Recs = this.props.recr.recs.map((rec) => {
      console.log('rec',rec);
    })
  }


  render() {
    // const recr = this.props.recr;
      return (

          <View>
            <RecList />
            </View>

      );
    }
  }
  module.exports = RecrView;
