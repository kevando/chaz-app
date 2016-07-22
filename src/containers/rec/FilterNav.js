import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as recActions from '../../reducers/rec/actions';
import FilterRow from '../../components/rec/FilterRow';
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
        {this.renderFilters()}
      </View>
    )
  }
  componentDidMount(){

  }
  onFilterPress(filterName,option){
    var oldFilter = this.props.rec.getIn(['filters',filterName]);
    var newFilter = oldFilter.merge({active:option})
    var key = filterName;
    var newFilterObject = {};
    newFilterObject[key] = newFilter;
    this.props.dispatch(recActions.updateFilter(newFilterObject));
  }

  renderFilters() { //
    var onPress = this.onFilterPress;

    var gradeFilter = this.props.rec.getIn(['filters','grade']);
    // var typeFilter

    return(
      <View>
        <FilterRow  filter={gradeFilter} onPress={this.onFilterPress.bind(this)} />
      </View>
    );


  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:'#ccc',
    height:100,
    // flex:1,
    // flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center'
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    flex:1,
    flexDirection:'row',
    margin:5,
  },
  filterContainer: {
    borderWidth: 2,
    borderColor: '#555'
  },
  option: {
    color: 'red'
  },
  active: {
    color:'blue'
  }

})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    rec: state.rec,
  }
}

export default connect(mapStateToProps)(FilterNav);
