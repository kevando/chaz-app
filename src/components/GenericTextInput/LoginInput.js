import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const LoginInput = (props) => {
  return (
    <View style={styles.loginContainer}>
      {props.borderTop ? <View style={styles.divider} /> : null}
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

LoginInput.propTypes = {
  borderTop: React.PropTypes.bool,
};

export default LoginInput;
