import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this) }>
        <View style={styles.right}>
          <Text style={styles.title} >{this.props.rec.title}</Text>
          <Text style={styles.grade} >{this.props.rec.grade}</Text>
        </View>
        <View style={styles.left}>
          <Text style={styles.recr} >{this.getRecrName()}</Text>
          <Text style={styles.score} >{this.getRecrScore()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  renderr() {
    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this) }>
        <Text>
          <Text style={{fontSize:15,fontWeight:'500'}}>
            [ {this.props.rec.title} ({this.props.rec.grade}) ]
            </Text>
            [ {this.getRecrName()} ({this.getRecrScore()})]
        </Text>
      </TouchableOpacity>
    );
  }
  getRecrName() {
    if(this.props.rec.recr)
      return this.props.rec.recr.name
  }
  getRecrScore() {
    if(this.props.rec.recr)
      return this.props.rec.recrScore
  }

  // chaz
  onRecPress() {
    this.props.navigator.push({
      title: "Rec",
      screen: "chaz.RecViewScreen",
      passProps: { currentRec: this.props.rec }
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
