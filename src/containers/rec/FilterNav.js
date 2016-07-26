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

  }
  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps');
  }



  render() {
    // tmp commenting this out
    // {this.renderFilter('grade')}

    var rec = this.props.rec;
    // console.log('RENDER REDUX REC PROPS',rec);

    return (
      <View style={styles.filtersContainer}>
        <Text style={{fontSize:15,color:'#444'}}>Filters:</Text>
        {this.renderFilter('type')}

      </View>
    )
  }
  componentDidMount(){

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
        active={activeFilter}
        onPress={this.onFilterPress.bind(this,filterType,option)} // eventually add filter type here
      />);
    });
  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:'#ccc',
    height:60,
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
