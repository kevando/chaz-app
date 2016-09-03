import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {colors,fonts} from '../style/Global';
import {connect} from 'react-redux';

const DeviceInfo = require('react-native-device-info');


class OnboardProgress extends Component {

  constructor(props){
    super(props)
    this.getStyle = this.getStyle.bind(this);
  }

  render(){
    let {value,label} = fonts;
    let onboard = this.props.onboard;
    let currentStep = onboard.get('currentStep');
    let getTextStyle = this.getStyle;

    return (
      <View style={styles.container}>

        <View style={styles.rowHeader}>
          <View style={styles.left}><Text style={styles.rowTitle}>Onboarding Progress ({currentStep})</Text></View>
        </View>

        {
          onboard.get('steps').map(function(step,index){
            var status = "complete";
            if(currentStep == index){status = 'active'}
            if(currentStep < index){status = 'pending'}
            return(
              <View style={styles.row} key={step.get('label')} >
                <View style={styles.left}><Text style={[label,getTextStyle(status)]}>{index}. {step.get('label')}</Text></View>
                <View style={styles.right}><Text style={[value,getTextStyle(status)]}>{status}</Text></View>
              </View>
            );
          })
        }
      </View>
    );
  }
  getStyle(status){
    switch(status){
      case 'complete': return{color:'green',fontWeight:'400'}
      case 'pending':  return{color:'#888', fontWeight:'300'}
      case 'active':   return{color:'#222',fontWeight:'500'}
      default: return {}
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: 'column',
    justifyContent:'flex-start',
    // backgroundColor: 'yellow',
  },
  rowHeader: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    padding:4,
    backgroundColor: "#ddd",
    marginTop:25,
    paddingLeft:8
  },

  rowTitle: {
    fontSize:14,
    color: "#999",
    fontWeight:'600'
  },
  row: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    padding:8,
    backgroundColor: "#fff"
  },
  left: {
    flex:9,
  },
  right: {
    flex:3,

  },
});


module.exports = OnboardProgress;
