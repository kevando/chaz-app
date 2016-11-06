import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';

const Button = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='blue', } = props;

  const customStyles = {
    backgroundColor:colors[bgcolor],
    borderColor:colors[bgcolor],
    color:colors[color],
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.button,customStyles]}>
          {text}
        </Text>
      </View>
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
