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
          delay={1000}
          style={styles.title}
          duration={1000}
          animation="fadeInUp"
        >chaz</Animatable.Text>

        <Animatable.Text
          style={styles.tagline}
          animation='fadeInUp'
          delay={2000}
          duration={1000}
        >
          The <Text style={{fontStyle:'italic',fontWeight:'500'}}>fastest</Text> way to save recommendations.
        </Animatable.Text>

        <Animatable.Text
          style={styles.tagline}
          animation='fadeInUp'
          delay={4000}
          duration={1000}
        >
          With reminders to follow up
        </Animatable.Text>

      </ScrollView>

        <Animatable.View animation='fadeInUp'
        delay={6000}
        duration={1000}>
        <Button text="Get Started" onPress={onButtonPress} />

        </Animatable.View>
    </View>
  );
}

export default Hello;
