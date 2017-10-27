import React from 'react';
import { View ,Text, TextInput } from 'react-native';
import _ from 'lodash';

import { Button, Label } from '../../components/Generic';

import styles from './styles';

const Register = (props) => {
  // console.log(props)
  const { onRegisterPress, updateState, status, error, onLoginPress } = props;

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Username'
          ref={ c => this._title = c }
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={(input) => updateState({username: input})}
        />
      </View>



      <Text style={styles.error}>{error}</Text>
      <Text style={styles.status}>{status}</Text>


      <View style={styles.buttonContainer}>
        <Button style={styles.button} text="Create Account" onPress={onRegisterPress} />
      </View>



    </View>
  );
}

export default Register;
