import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { hearts } from '../../config/styles';
import Emoji from 'react-native-emoji';


import * as Animatable from 'react-native-animatable';

const Loading = ({ text='Loading', heart='yellow', paddingTop=0 }) => {

  return (
    <View style={[styles.container,{paddingTop}]}>
    <Text style={styles.heart}>
      <Emoji name={hearts[heart]} />
    </Text>

    <Text style={styles.text}>{text}</Text>

    </View>
  );
};


export default Loading;
