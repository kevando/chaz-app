import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';

const styles= require('../styles/styles.js');
const RecListItem = require('../components/RecListItem');
import Loading from '../components/Loading';
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
    console.log('asfd');
      return (

          <View>
            <Text>dude</Text>
            </View>

      );
    }
  }
  // I do not understand any of this..
  // this should probly change to limit scope
  export default connect(state => ({
    state: state.chaz // this grabs information from the reducer.
  }),
  (dispatch) => ({
    actions: bindActionCreators(chazActions, dispatch)
  })
)(RecrView);
