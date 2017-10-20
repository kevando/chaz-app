import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';


const SettingsButton = ({navigator}) => {

  return (
    <TouchableOpacity onPress={() => navigator.push(Routes.getDebugRoute())} >
      <Text style={styles.settingsButton}> </Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;
