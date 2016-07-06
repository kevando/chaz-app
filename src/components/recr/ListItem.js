import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

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
      title: "Recr",
      screen: "chaz.RecrViewScreen",
      passProps: { recrKey: this.props.recr._key }
    });
  }
}
const styles = StyleSheet.create({
  row: {
    backgroundColor: '#eee',
    borderBottomWidth:1,
    borderBottomColor: '#ccc',
    height:50,
    flexDirection: 'row',
    padding:5,
  },
  right: {
    flex:1,
    // backgroundColor: 'blue'
  },
  left: {
    flex:1,
    // backgroundColor: 'yellow'
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
  },
  grade: {
    textAlign: 'left',
    fontSize: 14,
    color:'#444',
  },
  recr: {
    textAlign: 'right',
    fontSize: 14,
  },
  score: {
    textAlign: 'right',
    fontSize: 14,
    color:'#444',
  },

});
