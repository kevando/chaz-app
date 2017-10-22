import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';

const Splash = ({onNewRecPress}) => {



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
export default Splash;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.purple,

  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 80,
    paddingTop:70,
    paddingBottom: 0,
    fontWeight: '400',
    letterSpacing:4,
    paddingLeft: 17,

  },

});
