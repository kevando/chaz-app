import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
// import * as Animatable from 'react-native-animatable'
// import moment from 'moment'
import styles from './styles';

const Boilerplate = (props) => {
console.log(props)

  return (
    <ScrollView style={styles.container}>
      {
        _.map(props.user,(field,key ) => {return (
          <View style={styles.row} key={key}>
            <Text style={styles.keyText}>{key}:</Text>
            <Text style={styles.fieldText}>{JSON.stringify(field)}</Text>
          </View>
        )})
      }

      {
        _.map(props.app,(field,key ) => {
          if(key != 'error') { return (
            <View style={styles.row} key={key}>
              <Text style={styles.keyText}>{key}:</Text>
              <Text style={styles.fieldText}>{JSON.stringify(field)}</Text>
            </View>
        )}})
      }



    </ScrollView>
  );
}

export default Boilerplate;
