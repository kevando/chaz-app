import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RecCategory from '../RecCategory';
import RecGrade from '../RecGrade';
import styles from './styles';

const RecListItem = (props) => {
  const { rec, onPress } = props;

  return (
    <TouchableOpacity onPress={ () => onPress(rec) }>
      <View style={styles.badge}>
        <Text style={styles.title}><RecCategory category={rec.category} />{rec.title}</Text>
        <Text style={styles.note}>{rec.note}</Text>

          {rec.recr ?

            <Text style={styles.note}>Recommended by: {rec.recr.name}</Text>
            :
            null
          }

          <RecGrade grade={rec.grade} />

      </View>
    </TouchableOpacity>
  );
};

RecListItem.propTypes = {
  rec: React.PropTypes.object,
  onPress: React.PropTypes.func,
};


export default RecListItem;
