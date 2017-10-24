import React from 'react';
import { View ,Text, TextInput } from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';

import styles from './styles';

const Register = (props) => {
  // console.log(props)
  const { onRegisterPress, updateState, status, onLoginPress } = props;

  return (
    <View style={styles.container}>

      <Text style={styles.status}>{status}</Text>

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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          ref={ c => this._title = c }
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={(input) => updateState({email: input})}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} text="Create Account" onPress={onRegisterPress} />
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} text="Sign In" onPress={onLoginPress} />
      </View>

    </View>
  );
}

export default Register;
