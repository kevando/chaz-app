import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import Style from '../../style/Style';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this)}>
        <View style={styles.right}>
          <Text style={styles.title} >{this.props.recr.name}</Text>
        </View>
        <View style={styles.left}>
          <Text style={styles.score} >{this.getRecCount(this.props.recr.recs)}</Text>
        </View>
      </TouchableOpacity>

    );
  }
  getRecCount(recs) {
    if(!recs)
      return 0;
      var count = 0;
    for (var key in recs) {
      count++;
    }
    return count;
  }

  // chaz
  onRecPress() {
    this.props.navigator.push({
      title: "",
      screen: "chaz.RecrViewScreen",
      passProps: { recrKey: this.props.recr._key }
    });
  }
}
const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    height:50,
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10
  },
  right: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'row'
  },
  left: {
    flex:3,

  },
  title: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '500'
  },
  grade: {
    textAlign: 'left',
    fontSize: 14,
    color:'#444',
  },
  recrButton: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end' ,

  },
  recrText: {
    justifyContent: 'flex-end' ,
    fontSize: 14,
    fontWeight: '700',
    color: Style.constants.colors[2]
  },
  addRecr: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end' ,
    width:40

  },
  addRecrText: {
    color: '#fff',
    textAlign: 'center',
    width:40,
    backgroundColor: Style.constants.colors[2],
    fontSize: 26,
    marginTop:0,
    marginBottom:0
  },
  score: {
    textAlign: 'right',
    fontSize: 14,
    color:'#444',
  },

});
