import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import styles from './styles';
import { colors } from '../../config/styles';


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
  const { text, onPress, color='white', bgcolor='blue' } = props;

  const customStyles =
  {
    backgroundColor: colors[bgcolor],
    borderColor: colors[bgcolor],
    color: color,
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Text style={[styles.buttonText,customStyles]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export const FancyButton = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='blue', loading=false } = props;

  const customStyles =
  {
    backgroundColor: colors[bgcolor],
    borderColor: colors[bgcolor],
    color: color,
    fontStyle: loading ? 'italic' : 'normal',
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>

        <Text style={[styles.buttonText,customStyles]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
