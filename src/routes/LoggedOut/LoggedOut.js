import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';

const LoggedOut = (props) => {
  // console.log('loggedout props',props)
  const { user, app } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={()=>Actions.reset('lightbox')}>Logged out</Text>
      <Text style={styles.text}>{user.uid || "NO USER ID FOUND"}</Text>
      <Text style={styles.text}>is {!app.isAuthenticated && "NOT"} Authenticated and {!app.isAnonymous && "NOT"} Anonymous</Text>
    </View>
  );
}

export default LoggedOut;



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing:4,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text: {
    ...text,
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },

});
