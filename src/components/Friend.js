import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text } from '../config/styles';


export const Name = ({friend}) => {
  const textStyles = [
    ...text,
    // props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    // props.title && {fontSize: 20,fontWeight: '600'}
    {
      color: friend.uid ? colors.pink : colors.grey,
      fontSize: 21,
      fontWeight: '600',
    }

  ]
  return (
    <Text style={textStyles}>{friend.name}</Text>
  )
}
