import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from '../style/Global';


import {connect} from 'react-redux';

class OnboardPopup extends Component {
    constructor(props){
      super (props);
      this.closePopup = this.closePopup.bind(this)
    }

    render(){

      var {title,caption,instructions,buttonText} = this.props.passProps;

        return (
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.caption}>{caption}</Text>
              <Text style={styles.instructions}>{instructions}</Text>
              <TouchableOpacity onPress={this.closePopup}>
                <Text style={styles.button}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
        );
    }
    closePopup(){
      this.props.dispatch({type: 'INCREMENT_CURRENT_STEP',payload:this.props.onboard.get('currentStep')}); // this also takes care of setting onboard to false
      this.props.closeHandler()
    }
}
const styles = StyleSheet.create({

  container: {
    padding:0,
  },
    title: {
      fontSize:30,
      fontWeight:'600',
      marginBottom:10,
      marginTop:5,
      color:colors.darkGrey,
    },
    caption: {
      fontSize:20,
      fontWeight:'500',
      marginBottom:10,
      color:colors.darkGrey,
    },
    instructions: {
      fontSize:14,
      fontWeight:'400',
      color:colors.darkGrey,
    },
    button: {
      backgroundColor: colors.blue,
      textAlign:'center',
      color:'#fff',
      padding:10,
      marginRight:50, // style hack
      marginTop:20,
      marginBottom:20

    }
});

// module.exports = OnboardPopup;

function mapStateToProps(state) {
  return {
    // recs: this.recs,
    onboard: state.onboard
  };
}
export default connect(mapStateToProps)(OnboardPopup);
