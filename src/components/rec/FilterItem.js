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
        <RecType type={option} size={35} />
        </TouchableOpacity>
     );
  }


}

const styles = StyleSheet.create({

  filterButton: {
    backgroundColor:'#ddd',
    flexDirection:'column',
    justifyContent:'center', //vertical align

    borderRightWidth:2,
    borderRightColor:GlobalStyle.constants.colors[1],
    borderLeftWidth:2,
    borderLeftColor:GlobalStyle.constants.colors[1],
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:12,
    paddingRight:12,
  },
  active: {
    backgroundColor:GlobalStyle.constants.colors[1]
  }


})
