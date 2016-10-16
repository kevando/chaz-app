import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
import Emoji from 'react-native-emoji';

const QueueTitle = (props) => {
  const { title } = props;
  return (
      <Text style={styles.title}>
        {title} Queue
      </Text>
  );
};

QueueTitle.propTypes = {
  icon: React.PropTypes.string,
};

export default QueueTitle;
