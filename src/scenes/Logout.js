import React, { Component } from 'react';
import {View, Text, StyleSheet,} from "react-native";
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');
import timer from 'react-native-timer';

export default class Logout extends Component {


 componentDidMount(){
   console.log('LOG OUT MOUNTED')

   engine.save({}); // still not totally working

  // timer.setTimeout(this,'wait',function(){
  //   Actions.welcome();
  // },4200);

 }


  render(){

    return (
      <View style={styles.container}>
        <View style={{top:70,flex:1}}>
        <Text style={{fontWeight:'500',color:'#fff',fontSize:90,textAlign:'center'}} >u r logged out</Text>
        <Text style={{fontWeight:'500',color:'#fff',fontSize:12,textAlign:'center'}} >(restart app)</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
  },
});
