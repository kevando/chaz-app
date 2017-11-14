import React from 'react';
import { View, Text, TextInput, Button, StatusBar, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather'
import { Title } from '../../components/Generic'

import styles from './styles';

const Debug = ({user, app, onClose, refreshServerToken, signOut, changeNamePopup}) => {

  return(
    <View style={styles.container}>
      <Icon onPress={onClose} name="x" size={25} style={styles.closeButton} />

      <ScrollView style={styles.contentWrapper}>

        <Title black center>Debug Settings</Title>
        <Title black center sub>{user.uid}</Title>

        <Button onPress={refreshServerToken} title="Refresh Server Token" />
        <Button onPress={signOut} title="Sign Out" />
        <Button onPress={changeNamePopup} title="Change Name" />

        {
          _.map(user,(field,key ) => {return (
            <View style={styles.row} key={key}>
              <Text style={styles.keyText}>{key}:</Text>
              <Text style={styles.fieldText}>{JSON.stringify(field)}</Text>
            </View>
          )})
        }

        {
          _.map(app,(field,key ) => {
            if(key != 'error') { return (
              <View style={styles.row} key={key}>
                <Text style={styles.keyText}>{key}:</Text>
                <Text style={styles.fieldText}>{JSON.stringify(field)}</Text>
              </View>
          )}})
        }

      </ScrollView>

    </View>
  )

}

export default Debug;
