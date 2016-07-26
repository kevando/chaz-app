import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji'
export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {option,active,onPress} = this.props;
    return (
      <TouchableOpacity style={[styles.filterButton]} onPress={onPress}>
        <Text style={[styles.option]}>{option} : {active}</Text>
        </TouchableOpacity>
     );
  }
  renderFilterItems() {
    var filters = this.props.filters;

    return filters.map((option,index) => {
      return (
        <TouchableOpacity style={[styles.filterButton]} key={index} >
          <Text style={[styles.option]}>{option}</Text>
          </TouchableOpacity>
       );
     });

  }
  renderFilterItems_old() { // this should probly be its own component
    console.log('myFilter',this.props.filter)
    var options = this.props.filter.get('options');

    var queries = this.props.filter.get('queries');

    var filter = this.props.filter;
    var filterName = filter.get('name');

    return options.map((option,index) => {

      var isActive = (filter.get('active') == option ? styles.active : null);
      return (
        <TouchableOpacity style={[styles.filterButton]} key={index} onPress={this.props.onPress.bind(this,filterName,option)} >
          <Text style={[styles.option,isActive]}>{option}</Text>
          </TouchableOpacity>
       );
    })

  }
}

const styles = StyleSheet.create({


  filterContainer: {
    borderWidth: 2,
    borderColor: '#555'
  },
  filterButton: {

    borderWidth:1,
    borderColor:'black',
  },
  option: {
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:8,
    paddingRight:8,
    color: 'black'
  },
  active: {
    backgroundColor:'black',
    color:'#ccc'
  }

})
