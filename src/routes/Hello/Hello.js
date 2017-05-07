import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import * as Animatable from 'react-native-animatable';

import styles from './styles';
import Heartman from '../../components/Heartman';
import Button from '../../components/Button';



const Hello = ({onButtonPress}) => {



  return (
    <View style={styles.container}>

      <ScrollView>

        <Animatable.Text
          delay={800}
          style={styles.title}
          duration={800}
          animation="fadeInUp"
        >chaz</Animatable.Text>

        <Animatable.Text
          style={styles.tagline}
          animation='fadeInUp'
          delay={2000}
          duration={500}
        >
          Follow Up
        </Animatable.Text>

        <Animatable.Text
          style={styles.tagline}
          animation='fadeInUp'
          delay={2700}
          duration={500}
        >
          When people tell you about interesting things
        </Animatable.Text>

      </ScrollView>

        <Animatable.View animation='fadeInUp'
        delay={4000}
        duration={1000}>
        <Button text="Get Started" onPress={onButtonPress} />

        </Animatable.View>
    </View>
  );
}

export default Hello;
