import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

const Rec = ({ rec }) => {

  return (
    <View style={styles.container}>
      <Text>Title: {rec.title}</Text>
    </View>
  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
