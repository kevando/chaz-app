import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../../components/Button';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import styles from './styles';

const SignIn = (props) => {
  const { updateState, signIn, getStarted, error, confirmPasswordVisible } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.title}>chaz</Text>
        <Text style={styles.subHeaderText}>The fastest way to save recommendations</Text>
      </View>

      <InputWrapper>

        <GenericTextInput
          placeholder="username"
          onChangeText={(username) => updateState({ username })}
        />

      </InputWrapper>

      <View style={styles.error}>
        <Text style={styles.errorText}>{error}</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Sign In" onPress={signIn} />
      </View>

    </View>
  );
};

SignIn.propTypes = {
  updateState: React.PropTypes.func,
  signIn: React.PropTypes.func,
  createAccount: React.PropTypes.func,
  getStarted: React.PropTypes.func,
  error: React.PropTypes.string,
  confirmPasswordVisible: React.PropTypes.bool,
};

export default SignIn;
