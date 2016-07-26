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
    var isActive = (active == option ? styles.active : null);
    return (
      <TouchableOpacity style={[styles.filterButton]} onPress={onPress}>
        <Text style={[styles.option,isActive]}>{option}</Text>
        </TouchableOpacity>
     );
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
