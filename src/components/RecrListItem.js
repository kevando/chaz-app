import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Actions} from "react-native-router-flux";
import Emoji from 'react-native-emoji';

import GlobalStyle from '../style/Global';

export default class ListItem extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    // removing add recr until 0.8
    // {this.renderRecrDisplay()}

    var recr = this.props.recr;

    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
        <View style={{padding:10,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:6}}><Text style={{fontWeight:'600',fontSize:20}}><Emoji name="slightly_smiling_face"/>{recr.name}</Text></View>
            <View style={{flex:2}}><Text style={{fontWeight:'600',fontSize:20}}>90%</Text></View>
          </View>

        </View>

      </TouchableOpacity>
    );
  }

  onItemPress() {
    Actions.friend({recr: this.props.recr});
  }


}


const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    flexDirection: 'column', // inner rows on top of each other
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5
  },


  left: {
    flex:2,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor: 'red'
  },
  right: {
    flex:14,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor:'#fff',
    paddingLeft:5
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing:1.1
  },
  note: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '300',
    color: "#666",
    letterSpacing:1.0,
    marginTop:5
  }

});
