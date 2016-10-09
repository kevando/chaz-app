import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

const Rec = ({ rec, recr, onRecEditPress, onRecrEditPress }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onRecEditPress}>
        <Text>Title: {rec.title}</Text>
        <Text>Note: {rec.note}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRecrEditPress}>
        {recr ?
          <Text>recd by {recr.name}</Text>
          :
          <Text>rec not exists</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
