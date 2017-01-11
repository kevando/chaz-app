import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Routes from '../../config/routes';

const DashboardTitle = (props) => {
  const { title, navigator } = props;
  return (
    <TouchableOpacity onPress={() => navigator.push(Routes.getDebugRoute())} >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DashboardTitle;
