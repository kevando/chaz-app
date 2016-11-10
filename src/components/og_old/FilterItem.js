import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../style/Global';

// const recType = {
//   all: "Everything",
//   default: "page_with_curl",
//   other: "Other",
//   book: "Books",
//   video: "film_projector",
//   music: "Music",
//   food: "Food",
//   podcast: "Podcasts",
//   tv: "TV Shows",
//   movie: "Movies",
//   place: "Places",
// }



export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {filter,activeFilter,onPress,recCount} = this.props;
    var activeButtonStyle = (activeFilter == filter.id ? styles.activeButton : null);
    var activeTextStyle = (activeFilter == filter.id ? styles.activeText : null);
    return (
      <TouchableOpacity style={[styles.filterButton,activeButtonStyle]} onPress={onPress}>

        <Text style={[styles.filterText,activeTextStyle]}>{filter.label}</Text>

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
  },
  activeButton: {
    borderBottomWidth:3,
    borderBottomColor:"#fff",
  },
  filterText: {
    color:"#fff",
    fontSize:12,
    fontWeight:'400',
    textAlign:'center',
  },
  activeText: {
    color:"#fff",
    fontWeight:'700'
  },
})
