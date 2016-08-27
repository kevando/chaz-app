import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import {constants} from '../style/Global';

class OnboardPopup extends Component {
    constructor(props){
      super (props);
    }

    render(){

      var {title,caption,instructions,buttonText} = this.props.passProps.toJS();

        return (
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.caption}>{caption}</Text>
              <Text style={styles.instructions}>{instructions}</Text>
              <TouchableOpacity onPress={this.props.closeHandler}>
                <Text style={styles.button}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    title: {
      fontSize:30,
      fontWeight:'600',
      textAlign:'center',
      marginBottom:5,
      marginTop:15,
      color:'#333',
    },
    caption: {
      fontSize:20,
      fontWeight:'500',
      textAlign:'center',
      marginBottom:10,
      color:'#555',
    },
    instructions: {
      fontSize:15,
      fontWeight:'400',
      textAlign:'center',

    },
    button: {
      backgroundColor: constants.colors[1],
      textAlign:'center',
      color:'#fff',
      margin:40,
      padding:10
    }
});
module.exports = OnboardPopup;
