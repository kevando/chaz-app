import React, { Component } from 'react';
import {View, Text} from "react-native";
import timer from 'react-native-timer';
import RNRestart from 'react-native-restart';

export default class Logout extends Component {

 componentDidMount(){

   // Clear everything written to disk
   // Wait 2 seconds, then restart the app
   timer.setTimeout(this,'wait',function(){RNRestart.Restart();},2000);
 }

  render(){

    return (
      <View style={{flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: 'black'}}>
        <View style={{top:70,flex:1}}>
        <Text style={{fontWeight:'500',color:'#fff',fontSize:90,textAlign:'center'}} >u r logged out</Text>
        <Text style={{fontWeight:'500',color:'#fff',fontSize:12,textAlign:'center'}} >App will restart in 1 second</Text>
        </View>
      </View>
    );
  }

}
