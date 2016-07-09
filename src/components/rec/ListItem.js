import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AlertIOS
} from 'react-native';
import RecGrade from './RecGrade'
export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this) }>
        <View style={styles.left}>
          <Text style={styles.title} >{this.props.rec.title}</Text>
          <RecGrade grade={this.props.rec.grade} />
        </View>
        <View style={styles.right}>
          {this.getRecrDisplay()}
        </View>
      </TouchableOpacity>
    );
  }

  getRecrDisplay() {
    const recr = this.props.rec.recr;
    if(recr){
      return (
        <TouchableOpacity onPress={ this.onRecrPress.bind(this) }>
          <Text>{recr.name}</Text>
        </TouchableOpacity>

      )
    } else {
      return (
        <TouchableOpacity style={styles.addRecr} onPress={ this.props.onAddRecrPress }>
          <Text style={styles.addRecrText}>+</Text>
        </TouchableOpacity>
      );
    }
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

  onRecrPress() {
    this.props.navigator.push({
      title: "Recr",
      screen: "chaz.RecrViewScreen",
      passProps: {recrKey:this.props.rec.recr._key }
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
    paddingLeft:10
  },
  right: {
    flex:1,
    justifyContent: 'center', // vertical middle

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
  recr: {
    textAlign: 'right',
    fontSize: 14,
  },
  addRecr: {
    flex:1,
    flexDirection: 'row',
    // backgroundColor: 'red',

    justifyContent: 'center' // vertical middle

  },
  addRecrText: {
    color: '#fff',
    textAlign: 'center',
    width:40,
    backgroundColor: 'blue',
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
