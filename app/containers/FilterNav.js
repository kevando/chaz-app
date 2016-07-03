import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chazActions from '../actions/chazActions';

const styles= require('../styles/styles.js');
const constants = styles.constants;
// const { StyleSheet, Text, View, TouchableHighlight } = React;

class FilterNav extends Component {
  constructor(props){
    super(props);
  }

  updateSort(orderBy){
    this.props.actions.updateDisplayRecsSort(orderBy);
    this.props.actions.updateDisplayRecsList(); // can this be triggered based on filter change?
  }

  updateFilter(filter){
    this.props.actions.updateDisplayRecsFilter(filter);
    this.props.actions.updateDisplayRecsList(); // can this be triggered based on filter change?
  }

  render() {
    const {updateRecsFilter} = this.props.actions;
    const {recSort,recFilter} = this.props.state;
      return (
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <TouchableHighlight onPress={this.updateSort.bind(this,'newest')} >
              <Text style={[styles.filterButton,styles.isSortActive('newest',recSort)] }>Newest</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.updateSort.bind(this,'oldest')}>
                <Text style={[styles.filterButton,styles.isSortActive('oldest',recSort)]}>Oldest</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.updateSort.bind(this,'best')}>
                <Text style={[styles.filterButton,styles.isSortActive('best',recSort)]}>Best</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.filterRow}>
            <TouchableHighlight onPress={this.updateFilter.bind(this,"all")} >
              <Text style={[styles.filterButton,styles.isFilterActive('all',recFilter)] }>All</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.updateFilter.bind(this,'graded')} >
              <Text style={[styles.filterButton,styles.isFilterActive('graded',recFilter)] }>Graded</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.updateFilter.bind(this,'ungraded')} >
              <Text style={[styles.filterButton,styles.isFilterActive('ungraded',recFilter)] }>Ungraded</Text>
            </TouchableHighlight>
          </View>
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
  )(FilterNav);
