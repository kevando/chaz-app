import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../style/Global';

const recType = {
  all: "Everything",
  default: "page_with_curl",
  other: "Other",
  book: "Books",
  video: "film_projector",
  music: "Music",
  food: "Food",
  podcast: "Podcasts",
  tv: "TV Shows",
  movie: "Movies",
  place: "Places",
}



export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {filter,activeFilter,onPress,recCount} = this.props;
    var activeButtonStyle = (activeFilter == filter ? styles.activeButton : null);
    var activeTextStyle = (activeFilter == filter ? styles.activeText : null);
    return (
      <TouchableOpacity style={[styles.filterButton,activeButtonStyle]} onPress={onPress}>

        <Text style={[styles.filterText,activeTextStyle]}>{recType[filter]}</Text>

        </TouchableOpacity>
     );
  }


}

const styles = StyleSheet.create({

  filterButton: {
    backgroundColor:colors.purple,
    flexDirection:'column',
    justifyContent:'center', //vertical align
    borderRightWidth:0,
    borderRightColor:"#ccc",//GlobalStyle.constants.colors[1],
    borderLeftWidth:0,
    borderLeftColor:"#ccc",//GlobalStyle.constants.colors[1],
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:8,
    paddingRight:8,
    // width:70
  },
  activeButton: {
    // backgroundColor: colors.grey
  },
  filterText: {
    color:"#fff",
    fontSize:12,
    fontWeight:'400',
    textAlign:'center',
    lineHeight:20,
  },
  activeText: {
    color:"#fff",
    textDecorationLine:'underline',
    fontWeight:'700'
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
