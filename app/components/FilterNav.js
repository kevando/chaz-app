'use strict';
const React = require('react-native');
const styles= require('../styles/styles.js');
const constants = styles.constants;
const { StyleSheet, Component, Text, View, TouchableHighlight } = React;

class FilterNav extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeSort:'oldest'
    }
  }
  getStyle(orderBy){
    if(this.state.activeSort == orderBy)
      return {backgroundColor:'white',color:'#000'}
    else
      return {backgroundColor:'#ddd',color:'#fff'}
  }

  sortBy(orderBy){
    console.log('sortby', orderBy);
    this.setState({activeSort:orderBy}); // styles
    this.props.sortFunction(orderBy);
  }

  render() {
      return (
        <View style={styles.filterContainer}>
          <View style={{flex:1,flexDirection:'row',margin:5,borderColor:'#fff',borderWidth:1}}>
            <TouchableHighlight onPress={this.sortBy.bind(this,'newest')} >
              <Text style={[this.getStyle('newest'),styles.filterButton] }>Newest</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.sortBy.bind(this,'oldest')}>
                <Text style={[this.getStyle('oldest'),styles.filterButton]}>Oldest</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
  module.exports = FilterNav;
