import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';
import FilterItem from '../components/FilterItem';
import * as Global from '../style/Global';
import {colors} from '../style/Global';

class FilterNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var rec = this.props.rec;

    return (
      <ScrollView horizontal={true} contentContainerStyle={{backgroundColor:'#ccc'}}>
      <View style={styles.filtersContainer} >
        <View style={styles.filterRow}>
          {this.renderFilters()}
        </View>
        </View>
      </ScrollView>
    )
  }

  onFilterPress(filter){
    this.props.dispatch(appActions.setFilter(filter));
  }

  renderFilters(filterType) { // these variables are not named very well
    var onPress = this.onFilterPress;

    var filterList = this.props.app.get('filters');
    var activeFilter = this.props.app.get('activeFilter');

    var renderedFilterList = Array()
    // need to do it like this cause returning a map is some experimental feature

    filterList.map((filter) => {

      renderedFilterList.push(
        <FilterItem
          filter={filter}
          key={filter}
          style={styles.filterItem}
          activeFilter={activeFilter}
          onPress={this.onFilterPress.bind(this,filter)}
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
    borderTopWidth:1,
    borderTopColor: "#ccc",//GlobalStyle.constants.colors[1],
    borderBottomWidth:4,
    borderBottomColor:colors.purple,
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    flex:1,
    flexDirection:'row',
    // justifyContent:'center',
    alignItems:'stretch',
    margin:0,
    borderRightWidth: 0,
    borderRightColor: "#ccc",//GlobalStyle.constants.colors[1],
    borderLeftWidth: 0,
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
