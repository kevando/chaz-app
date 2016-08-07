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
    var {filter,active,onPress,filterObject,recCount} = this.props;
    var activeButtonStyle = (active == filter ? styles.activeButton : null);
    var activeTextStyle = (active == filter ? styles.activeText : null);
    return (
      <TouchableOpacity style={[styles.filterButton,activeButtonStyle]} onPress={onPress}>
        <RecType type={filter} size={25} />
        <Text style={[styles.filterText,activeTextStyle]}>{filterObject.get('title')}</Text>
        <View style={styles.countContainer}>
          <Text style={[styles.count,activeTextStyle]}>{recCount}</Text>
        </View>
        </TouchableOpacity>
     );
  }


}

const styles = StyleSheet.create({

  filterButton: {
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'center', //vertical align
    borderRightWidth:1,
    borderRightColor:"#ccc",//GlobalStyle.constants.colors[1],
    borderLeftWidth:1,
    borderLeftColor:"#ccc",//GlobalStyle.constants.colors[1],
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:5,
    paddingRight:5,
    width:70
  },
  activeButton: {
    backgroundColor: GlobalStyle.constants.colors[1],
  },
  filterText: {
    color:"#555",
    fontSize:10,
    fontWeight:'400',
    textAlign:'center',
  },
  activeText: {
    color:"#fff"
  },
  countContainer:{
    height:10,
    width:10,
    position:'absolute',
    top:2,
    right:11,
    flexDirection:'column',
    justifyContent:'center', //vertical align
  },
  count: {
    fontSize:7,
    color:'#111',
    textAlign:'center',
    backgroundColor:'rgba(0,0,0,0)', //clear
  }
})
