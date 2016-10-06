import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

const Rec = ({ rec, onRecEditPress }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onRecEditPress}>
        <Text>Title: {rec.title}</Text>
        <Text>Note: {rec.note}</Text>
      </TouchableOpacity>
    </View>
  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
