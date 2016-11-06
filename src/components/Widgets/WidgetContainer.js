import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles';
import Emoji from 'react-native-emoji';

const WidgetContainer = (props) => {
  return (
    <View style={styles.container}>

        <View style={styles.titleContainer}>
          <View style={styles.titleLeft}>
            <Text style={styles.icon}><Emoji name={props.icon} /></Text>
          </View>
          <View style={styles.titleRight}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {props.children}
        </View>

    </View>
  );
};


export default WidgetContainer;
