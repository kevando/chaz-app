import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text } from '../../config/styles';
import * as Animatable from 'react-native-animatable';

// FancyButton = Animatable.createAnimatableComponent(Button);



export const Label = (props) => {
  const labelStyles = [
    styles.label,
    props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    props.title && {fontSize: 20,fontWeight: '600'}
  ]
  return (
    <Text style={labelStyles}>{props.children}</Text>
  )
}


export const Button = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='green', rounded=false } = props;

  const styles = StyleSheet.create({

    container:
    {
      backgroundColor: colors[bgcolor],
      borderColor: colors[bgcolor],
      // color: color,
      borderRadius: rounded ? 40 : 0,
      borderWidth: 10,
      // borderColor: 'red',
    },

    text:
    {
      // ...text,
      fontSize: 30,

      fontFamily: 'System',
      // color: colors.black,
      letterSpacing: 0.5,
      fontWeight: '500',
      // ^^^^ ...text not working for some reason
      margin: 0,
      fontSize: 17,
      fontWeight: '500',
      borderWidth: 0,
      paddingVertical: 10,
      paddingHorizontal: 20,
      margin: 0,
      fontSize: 17,
      color: color,
    }
  })


  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export const FancyButton = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='green', loading=false } = props;

  const customStyles =
  {
    backgroundColor: colors[bgcolor],
    borderColor: colors[bgcolor],
    color: color,
    fontStyle: loading ? 'italic' : 'normal',
  }


  return (
    <Animatable.View animation='fadeInUp' delay={300} duration={500}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>

        <Text style={[styles.buttonText,customStyles]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
    </Animatable.View>
  );
};


// ---------------------------------------
//  Divider
// ---------------------------------------


export const Divider = (props) => {
  const dividerStyles = [
    // styles.label,
    {
      flex: 1,
      backgroundColor: '#ddd',
      padding: 0,
      height: 2,
      marginVertical: 20,
    }
  ]
  return (
    <View style={dividerStyles} />
  )
}
