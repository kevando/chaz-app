import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RecCategory from '../RecCategory';
import styles from './styles';

const RecListItem = (props) => {
  const { rec, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        <RecCategory rec={rec} />{rec.title}
      </Text>
    </TouchableOpacity>
  );
};

RecListItem.propTypes = {
  rec: React.PropTypes.object,
  onPress: React.PropTypes.func,
};


export default RecListItem;
