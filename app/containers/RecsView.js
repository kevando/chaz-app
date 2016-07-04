import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';

import ActionButton from '../containers/ActionButton';
import FilterNav from '../containers/FilterNav';
import RecList from '../containers/RecList';

import Loading from '../components/Loading';

import * as styles from '../styles/styles.js';

class RecsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
    };
  }


  render() {
    const { displayRecs } = this.props.state;

    if(!displayRecs)
      return(<Loading text="Loading Display Recs" />);

    return(
      <View style={styles.listContainer}>
        <ScrollView style={styles.listview} >
          <FilterNav />
          <RecList recs={displayRecs} navigator={this.props.navigator} />
        </ScrollView>
        <ActionButton title="Add Recommedation" />
      </View>
    )

  }


}

// module.exports = RecsView;

// I do not understand any of this..
// this should probly change to limit scope
export default connect(state => ({
  state: state.chaz // this grabs information from the reducer.
}),
(dispatch) => ({
  actions: bindActionCreators(chazActions, dispatch)
})
)(RecsView);
