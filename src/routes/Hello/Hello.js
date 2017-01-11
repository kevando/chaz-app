import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import styles from './styles';

const Hello = ({onStartPress}) => {

  return (
    <View style={styles.container}>

      <Text style={styles.title} >chaz</Text>
      <Text style={styles.tagline} >The fasest way to save recommendations.</Text>

      <Button large style={styles.button} onPress={onStartPress}> START SAVING </Button>

    </View>
  );
}

export default Hello;
