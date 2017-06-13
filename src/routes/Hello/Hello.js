import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { colors } from '../../config/styles';
import styles from './styles';
// import Heartman from '../../components/Heartman';
import Button from '../../components/Button';



const Hello = ({onButtonPress}) => {



  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ScrollView>

      <Animatable.View
        delay={10}
        duration={500}
        animation="fadeInUp"
      >


      <Text style={styles.title}><Icon name="heart" size={50} color={colors.yellow} />chaz</Text>

      <Text style={styles.paragraph}>Friends always recommend stuff like movies and books, but we don’t always remember to follow up.</Text>

      <Text style={styles.paragraph}>Next time someone says: “you gotta check this out!” Open chaz!</Text>


      </Animatable.View>


      </ScrollView>
        <Button text="Add 1st Recommendation" onPress={onButtonPress} />
    </View>
  );
}

export default Hello;
