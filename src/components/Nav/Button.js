import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = (props) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} >
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
