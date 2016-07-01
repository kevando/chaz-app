'use strict';
const React = require('react-native');
const styles= require('../styles/styles.js');
const constants = styles.constants;
const { StyleSheet, Component, Text, View, TouchableHighlight } = React;

class FilterNav extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeSort:'oldest',
      activeFilter: 'all'
    }
  }
  getOrderStyle(orderBy){
    if(this.state.activeSort == orderBy)
      return {backgroundColor:'white',color:'#000'}
    else
      return {backgroundColor:'#ddd',color:'#fff'}
  }
  getFilterStyle(filterBy){
    if(this.state.activeFilter == filterBy)
      return {backgroundColor:'white',color:'#000'}
    else
      return {backgroundColor:'#ddd',color:'#fff'}
  }

  sortBy(orderBy){
    this.setState({activeSort:orderBy}); // styles
    this.props.sortFunction(orderBy);
  }
  filterBy(filterBy){
    this.setState({activeFilter:filterBy}); // styles
    this.props.filterFunction(filterBy);
  }

  render() {
      return (
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <TouchableHighlight onPress={this.sortBy.bind(this,'newest')} >
              <Text style={[this.getOrderStyle('newest'),styles.filterButton] }>Newest</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.sortBy.bind(this,'oldest')}>
                <Text style={[this.getOrderStyle('oldest'),styles.filterButton]}>Oldest</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.filterRow}>
            <TouchableHighlight onPress={this.filterBy.bind(this,'all')} >
              <Text style={[this.getFilterStyle('all'),styles.filterButton] }>All</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.filterBy.bind(this,'graded')} >
              <Text style={[this.getFilterStyle('graded'),styles.filterButton] }>Graded</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.filterBy.bind(this,'ungraded')} >
              <Text style={[this.getFilterStyle('ungraded'),styles.filterButton] }>Ungraded</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
  module.exports = FilterNav;
