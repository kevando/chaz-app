import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import moment from 'moment';
import Emoji from 'react-native-emoji';

// const Recr = ({ recr, onRecrEditPress, updateState, onGradeRecPress }) => {
const Recr = ({ recr  }) => {

  // var d = new Date(rec.createdAt);
  // var savedAgo = moment(d).fromNow();

  return (

    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{recr.name}</Text>
      </View>


    </View>

  );
};

Recr.propTypes = {
  // rec: PropTypes.object,
};

export default Recr;
