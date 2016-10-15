import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
import Emoji from 'react-native-emoji';

const QueueTitle = (props) => {
  const { icon } = props;
  return (
      <Text style={styles.title}>
        <Emoji name={icon} /> Queue
      </Text>
  );
};

QueueTitle.propTypes = {
  icon: React.PropTypes.string,
};

export default QueueTitle;
