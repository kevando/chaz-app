import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';
import RNRestart from 'react-native-restart'; // Import package from node modules


export default LoggedOut = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Logged Out</Text>
      <Icon name="power" color='white' style={styles.cloudIcon} onPress={() => RNRestart.Restart() } />
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing:4,
    marginTop: 100,
    marginBottom: 70,
    marginHorizontal: 20,
  },
  cloudIcon: {
    fontSize: 140,
  }
  // text: {
  //   ...text,
  //   color: colors.white,
  //   fontSize: 20,
  //   textAlign: 'center',
  //   fontWeight: '300',
  // },

});
