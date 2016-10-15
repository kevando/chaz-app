import React from 'react';
import { Text, View, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import images from '../../config/images';
import styles from './styles';

const SignIn = (props) => {
  const { updateState, signIn, getStarted, error, confirmPasswordVisible } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={images.logo}
        />

      <Text style={styles.headerText}>Welcome to chaz</Text>
        <Text style={styles.subHeaderText}>the app</Text>
      </View>

      <InputWrapper>
        <GenericTextInput
          placeholder="username"
          onChangeText={(username) => updateState({ username })}
        />
        {confirmPasswordVisible ?
          <GenericTextInput
            placeholder="confirm password"
            onChangeText={(confirmPassword) => updateState({ confirmPassword })}
            secureTextEntry
            borderTop
          />
        : null}
      </InputWrapper>

      <View style={styles.error}>
        <Text style={styles.errorText}>{error}</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Sign In" onPress={signIn} />
      </View>

      <KeyboardSpacer />
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
