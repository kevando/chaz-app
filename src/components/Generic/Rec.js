import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text } from '../../config/styles';


export const Title = ({rec}) => {
  const textStyles =
    {
      ...text,
      // color: colors.blue,
      // backgroundColor: '#cdd'
    }


  return (
    <Text style={textStyles}>{rec.title}</Text>
  )
}
