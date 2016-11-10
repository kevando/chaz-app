import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
var dismissKeyboard = require('dismissKeyboard');

const Button = (props) => {
  const { text, onPress } = props;

  const onButtonPress = () => {
    dismissKeyboard();
    onPress();
  }

  return (
    <TouchableOpacity onPress={onButtonPress} >
      <Text style={styles.button}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

export default Button;
