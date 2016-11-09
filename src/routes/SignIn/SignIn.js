import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../../components/Button';
import { InputWrapper, LoginInput } from '../../components/GenericTextInput';
import styles from './styles';

const SignIn = (props) => {

  const { updateState, signIn, getStarted, error, confirmPasswordVisible, showInput } = props;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>chaz</Text>
        <Text style={styles.subHeaderText}>The fastest, easiest way to save {'\n'}recommendations from your friends.</Text>
      </View>


      {showInput ?
        <View>

          <InputWrapper>
            <LoginInput
              placeholder="username"
              onChangeText={(username) => updateState({ username })}
            />
          </InputWrapper>

          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>

          <View style={styles.buttons}>
            <Button text="Log In" onPress={ signIn } />
          </View>

          <Text style={styles.subHeaderText}>* The final version of chaz will not require a username, but it makes things much easier during the beta test</Text>

        </View>
      :

      <View style={styles.buttons}>
        <Button text="Get Started" onPress={() => updateState({showInput: true})} bgcolor='white' color='purple' />
      </View>

     }

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
