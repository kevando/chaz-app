import React from 'react';
import { View, Text, ScrollView, StatusBar, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';

import styles from './styles';



const RecView = ({rec, onEditPress}) => {



  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView>
      <Text style={styles.title}>{rec.title}</Text>
      <Text style={styles.paragraph}>Friend: {rec.friend}</Text>
      <Text style={styles.paragraph}>{rec.id}</Text>
      <Button title="edit" onPress={onEditPress} />
      </ScrollView>
    </View>
  );
}

export default RecView;
