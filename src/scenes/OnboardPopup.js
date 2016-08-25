import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

var {
  height: deviceHeight
} = Dimensions.get("window");



class OnboardPopup extends Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(deviceHeight)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            delay:30,
            toValue: 0
        }).start();
    }

    closeModal() {
      console.log('onboard closemodal called')
        Animated.timing(this.state.offset, {
            duration: 150,
            delay:20,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    render(){
      console.log('props',this.props);
      var {title,caption,instructions,buttonText} = this.props.data.toJS();

        return (
            <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"},
                                  {transform: [{translateY: this.state.offset}]}]}>
                <View style={{  width:250,
                                borderColor:"#999",
                                borderWidth:2,
                                justifyContent: "center",
                                alignItems: "center",
                                padding:20,
                                backgroundColor:"white" }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.caption}>{caption}</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <Button onPress={this.closeModal.bind(this)}>{buttonText}</Button>
                </View>
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
      fontSize:25,
      fontWeight:'600',
      textAlign:'center',
      marginBottom:5
    },
    caption: {
      fontSize:20,
      fontWeight:'500',
      textAlign:'center',
      marginBottom:10
    },
    instructions: {
      fontSize:15,
      fontWeight:'400',
      textAlign:'center',
      marginBottom:15
    }
});
module.exports = OnboardPopup;
