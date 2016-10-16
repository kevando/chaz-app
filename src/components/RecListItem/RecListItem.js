import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RecCategory from '../RecCategory';
import styles from './styles';

const RecListItem = (props) => {
  const { rec, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.badge}>
        <Text style={styles.title}>{rec.title}</Text>
        <Text style={styles.note}>{rec.note}</Text>

          {rec.recr_score ?
            <Text style={styles.note}>Score: {rec.recr_score.overall}</Text>
            :
            null
          }

          {rec.recr_score ?
            <Text style={styles.note}>Cat Score: {rec.recr_score[rec.category]}</Text>
            :
            null
          }

          {rec.recr_name ?

            <Text style={styles.note}>Recr: {rec.recr_name}</Text>
            :
            null
          }

      </View>
    </TouchableOpacity>
  );
};

RecListItem.propTypes = {
  rec: React.PropTypes.object,
  onPress: React.PropTypes.func,
};


export default RecListItem;
