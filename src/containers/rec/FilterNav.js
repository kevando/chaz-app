import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as recActions from '../../reducers/rec/actions';
import FilterItem from '../../components/rec/FilterItem';
const GlobalStyle = require('../../style/Style');

// tmp
import * as Immutable from 'immutable';

class FilterNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // tmp commenting this out
    // {this.renderFilter('grade')}
    var rec = this.props.rec;

    return (
      <ScrollView horizontal={true} contentContainerStyle={{backgroundColor:'#ccc',flex:1,flexDirection:'row',}}>
      <View style={styles.filtersContainer} >
        <View style={styles.filterRow}>
          {this.renderFilters('type')}
        </View>
        </View>
      </ScrollView>
    )
  }

  onFilterPress(filter,option){
    this.props.dispatch(recActions.updateFilter(filter,option));
  }

  renderFilters(filterType) { // these variables are not named very well
    var onPress = this.onFilterPress;

    var filterList = this.props.rec.getIn(['filters',filterType,'list']);
    var activeFilter = this.props.rec.getIn(['filters',filterType,'active']);

    var renderedFilterList = Array()
    // need to do it like this cause returning a map is some experimental feature

    filterList.map((filterObject,filter) => {

      renderedFilterList.push(
        <FilterItem
          filterObject={filterObject}
          filter={filter}
          recCount={this.getRecCount(filterObject)}
          key={filter}
          style={styles.filterItem}
          active={activeFilter}
          onPress={this.onFilterPress.bind(this,filterType,filter)}
        />
      )
    });

    return renderedFilterList;
  }

  getRecCount(filterObject){
    // probly a cleaner more redux appropriate way to get this data
    // at the very list, write this somewhere other than the filter component
    var recList = this.props.rec.get('all');
    var filterQuery = filterObject.get('query');
    var filteredList = recList.filter(function(rec) {
      return filterQuery.includes(rec.get('type'));
    });
    return filteredList.size;
  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    borderTopWidth:0,
    borderTopColor: "#ccc",//GlobalStyle.constants.colors[1],
    borderBottomWidth:4,
    borderBottomColor:GlobalStyle.constants.colors[1],
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    flex:1,
    flexDirection:'row',
    // justifyContent:'center',
    alignItems:'stretch',
    margin:0,
    borderRightWidth: 2,
    borderRightColor: "#ccc",//GlobalStyle.constants.colors[1],
    borderLeftWidth: 2,
    borderLeftColor: "#ccc",//GlobalStyle.constants.colors[1],
  },
  filterItem: {
    flex:1,
    flexDirection:'row',
    // backgroundColor:'red',
    padding:0
  }


})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    rec: state.rec,
  }
}

export default connect(mapStateToProps)(FilterNav);
