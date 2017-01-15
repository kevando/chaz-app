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
          delay={1100}
          style={styles.title}
          duration={1100}
          animation="fadeInUp"
        >chaz</Animatable.Text>

        <Animatable.Text
          style={styles.tagline}
          animation='lightSpeedIn'
          delay={2000}
          duration={500}
        >

          The <Text style={{fontStyle:'italic',fontWeight:'500'}}>fastest</Text> way to save recommendations.

        </Animatable.Text>
        </ScrollView>

        <Animatable.View animation='fadeInUp'
        delay={2500}
        duration={500}>
        <Button text="Get Started" onPress={onButtonPress} />

        </Animatable.View>
    </View>
  );
}

export default Hello;
