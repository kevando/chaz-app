import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { colors } from '../../config/styles';

const Tooltip = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='blue' } = props;

  return (
      <View style={styles.container}>
        <Text style={styles.button}>
          {text}
        </Text>
      </View>
  );
};


export default Tooltip;
