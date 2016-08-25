import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";


export default class extends Component {
    constructor(props){
      super (props);
    }


    render(){
      return (
        <View >
          <Text>{this.props.data}Dude I am inner content</Text>
          <Button onPress={this.props.kevin}>Closeee</Button>
        </View>
        )
    }
}
