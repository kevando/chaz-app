import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';


import * as styles from '../styles/styles.js';

class RecList extends Component {



  render() {


    return(
      <View style={styles.listContainer}>
        <Text>YO</Text>
      </View>
    )

  }


}

module.exports = RecList;
//
// // I do not understand any of this..
// // this should probly change to limit scope
// export default connect(state => ({
//   state: state.chaz // this grabs information from the reducer.
// }),
// (dispatch) => ({
//   actions: bindActionCreators(chazActions, dispatch)
// })
// )(RecList);
