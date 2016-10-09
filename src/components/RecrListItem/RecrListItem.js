import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const RecrListItem = (props) => {
  const { rec, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {rec.name}
      </Text>
    </TouchableOpacity>
  );
};

RecrListItem.propTypes = {
  rec: React.PropTypes.object,
  onPress: React.PropTypes.func,
};


export default RecrListItem;
