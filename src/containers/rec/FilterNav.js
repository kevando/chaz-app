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

        {this.renderFilter('type')}

        </View>
      </ScrollView>

    )
  }

  onFilterPress(filter,option){
    this.props.dispatch(recActions.updateFilter(filter,option));
  }

  renderFilter(filterType) { //
    var onPress = this.onFilterPress;

    var filterQuery = this.props.rec.getIn(['filters',filterType,'queries']);
    var filters = filterQuery.keySeq().toArray()
    var activeFilter = this.props.rec.getIn(['filters',filterType,'active'])

    return(
      <View style={styles.filterRow}>
        {this.renderFilterItems(filterType,filters,activeFilter)}
      </View>
    );


  }
  renderFilterItems(filterType,options,activeFilter){
    return options.map((option,index) => {
      return (<FilterItem
        option={option}
        key={index}
        style={styles.filterItem}
        active={activeFilter}
        onPress={this.onFilterPress.bind(this,filterType,option)} // eventually add filter type here
      />);
    });
  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:'#ddd',

    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth:4,
    borderTopColor:GlobalStyle.constants.colors[1],
    borderBottomWidth:4,
    borderBottomColor:GlobalStyle.constants.colors[1],
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    // flex:1,
    flexDirection:'row',
    margin:0,
    borderRightWidth: 2,
    borderRightColor: GlobalStyle.constants.colors[1],
    borderLeftWidth: 2,
    borderLeftColor: GlobalStyle.constants.colors[1],
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
