import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const NavButton = (props) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

NavButton.propTypes = {
  text: React.PropTypes.string,
};

export default NavButton;
