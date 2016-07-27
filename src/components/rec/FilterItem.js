import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RecType from '../../components/rec/RecType';
const GlobalStyle = require('../../style/Style');
export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {option,active,onPress} = this.props;
    var isActive = (active == option ? styles.active : null);
    return (
      <TouchableOpacity style={[styles.filterButton,isActive]} onPress={onPress}>
        <RecType type={option} size={20} />
        </TouchableOpacity>
     );
  }


}

const styles = StyleSheet.create({

  filterButton: {


    borderRightWidth:2,
    borderRightColor:GlobalStyle.constants.colors[1],
    borderLeftWidth:2,
    borderLeftColor:GlobalStyle.constants.colors[1],
    paddingTop:4,
    paddingBottom:4,
    paddingLeft:8,
    paddingRight:8,
  },
  active: {
    backgroundColor:GlobalStyle.constants.colors[1]
  }


})
