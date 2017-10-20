import { AppRegistry } from 'react-native';
import App from './src';
// import App from './firestore';

console.ignoredYellowBox = ['Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).'];

import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
// import { colors, text } from '../../config/styles';

const Splash = ({onNewRecPress}) => {



  return (
    <View style={styles.container}>
      

      <ScrollView>




      <Text style={styles.title}><Icon name="heart" size={50} color="yellow" />splahhh</Text>





      </ScrollView>

    </View>
  );
}
// <AppSettings {...props} />
export default Splash;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'red',

  },
  title: {

    color: 'white',
    fontSize: 80,
    paddingTop:70,
    paddingBottom: 0,
    fontWeight: '400',
    letterSpacing:4,
    paddingLeft: 17,

  },

});


AppRegistry.registerComponent('Chaz', () => Splash);
