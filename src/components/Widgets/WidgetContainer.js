import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles';
import Emoji from 'react-native-emoji';

const WidgetContainer = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}><Emoji name={props.icon} />&nbsp;&nbsp;{props.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {props.children}
        </View>
    </View>
  );
};


export default WidgetContainer;
