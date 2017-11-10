import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';

export default LoggedOut = (props) => {

  // const { user, app } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={()=>Actions.reset('lightbox')}>Logged out {props.app.onboarding ? 'onboard' : 'no onboard'}</Text>
      <Icon name="cloud-off" color='white' style={styles.cloudIcon} onPress={() => props.setAppData({onboarding:false})} />
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
