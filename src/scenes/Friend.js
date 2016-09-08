import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AlertIOS,ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";

import {connect} from 'react-redux';


class Friend extends Component {

  constructor(props) {
    super(props)
    // this will make it easier to handle the new props
    this.state = {recr:this.props.recr}
    // Set delete button in top right

  }


  render(){

    var {recr} = this.state;

    return (
      <View  style={styles.container}>
        <ScrollView>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:30}}>{recr.name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:20}}>{this.renderScore(recr)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:15}}>Total Recommendations: {recr.stats.totalRecs}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:15}}>Graded Recommendations: {recr.stats.totalGradedRecs}</Text>
            </View>
          </View>


        </ScrollView>
      </View>
    );
  }
  renderScore(recr) {
    if(recr.stats.score)
      return "Score: " + recr.stats.score + "%"
    else
      return "No score yet";
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // backgroundColor:'#444',
    borderTopWidth: 2,
    flexDirection:'column'

    // borderTopColor: 'red'

  },
  row: {
    // backgroundColor: 'red',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // inner rows on top of each other
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5,

  },

  left: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  right: {
    flex:8,
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


function mapStateToProps(state) {
  return {
    // recs: this.recs,
    app: state.app
  };
}
export default connect(mapStateToProps)(Friend);
