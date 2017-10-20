import React from 'react';
import { View, Text, ScrollView, StatusBar, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';

import styles from './styles';



const RecView = ({ rec, onEditPress, onDeletePress }) => {



  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>{rec.title}</Text>
      <Text style={styles.paragraph}>Friend: {rec.friend}</Text>

      <Button title="edit" onPress={onEditPress} />
      <Button title="delete" onPress={onDeletePress} color="red" />
      </ScrollView>
    </View>
  );
}

export default RecView;
