import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as recActions from '../../reducers/rec/actions';
import FilterItem from '../../components/rec/FilterItem';
const GlobalStyle = require('../../style/Style');

// tmp
import * as Immutable from 'immutable';

class FilterNav extends Component {
  constructor(props) {
    super(props);
    // name: 'grade',
    // active: 'all',
    // options: ['all','graded','ungraded']
    this.state = {
      filters: Immutable.Map({
        grade: {
          active: 'all',
          options: ['all','graded','ungraded']
        }

      }), //filters Map

    } // state
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }



  render() {
    var rec = this.props.rec;
    console.log('RENDER REDUX REC PROPS',rec);

    return (
      <View style={styles.filtersContainer}>
        <Text style={{fontSize:15,color:'#444'}}>Filters:</Text>
        {this.renderFilter()}
      </View>
    )
  }
  componentDidMount(){

  }
  onFilterPress(option){
    // var oldFilter = this.props.rec.getIn(['filters',filterName]);
    // var newFilter = oldFilter.merge({active:option})
    // var key = filterName;
    // var newFilterObject = {};
    // newFilterObject[key] = newFilter;
    this.props.dispatch(recActions.updateTypeFilter(option));
  }

  renderFilter() { //
    var onPress = this.onFilterPress;

    // var gradeFilter = this.props.rec.getIn(['filters','grade']);
    // var typeFilter = this.props.rec.getIn(['filters','type']);
    // console.log('rec prop',this.props.rec)
    // var typeFilter
    var activeTypeFilterQuery = this.props.rec.getIn(['filters','type','queries']);
    console.log('activeTypeFilterQuery',activeTypeFilterQuery)
    // var typeFilters = Object.keys(activeTypeFilterQuery)
    var typeFilters = activeTypeFilterQuery.keySeq().toArray()
    console.log(typeFilters);
    var activeTypeFilter = this.props.rec.getIn(['filters','type','active'])

    return(
      <View style={styles.filterRow}>
        {this.renderFilterItems(typeFilters,activeTypeFilter)}

      </View>
    );


  }
  renderFilterItems(options,activeTypeFilter){
    return options.map((option,index) => {
      return (<FilterItem
        option={option}
        key={index}
        active={activeTypeFilter}
        onPress={this.onFilterPress.bind(this,option)} // eventually add filter type here
      />);
    });
  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:'#ccc',
    height:100,
    // flex:1,
    flexDirection:'column',
    alignItems:'center',
    // justifyContent:'center'
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    // flex:1,
    flexDirection:'row',
    margin:5,
    borderWidth: 1,
    borderColor: 'black'
  },


})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    rec: state.rec,
  }
}

export default connect(mapStateToProps)(FilterNav);
