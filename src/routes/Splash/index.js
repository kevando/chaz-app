import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { colors } from '../../config/styles';
import styles from './styles';
// import Button from '../../components/Button';

const Welcome = ({onNewRecPress}) => {



  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ScrollView>

      <Animatable.View
        delay={10}
        duration={500}
        animation="fadeInUp"
      >


      <Text style={styles.title}><Icon name="heart" size={50} color={colors.yellow} />splash</Text>


      </Animatable.View>


      </ScrollView>

    </View>
  );
}
// <AppSettings {...props} />
export default Welcome;
