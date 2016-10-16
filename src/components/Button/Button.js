import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';

const Button = (props) => {
  const { text, onPress, color='blue' } = props;
  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:colors[color]}]} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

Button.defaultProps = {
  text: 'Button Text',
  onPress: () => console.log('Button Pressed'),
};

export default Button;
