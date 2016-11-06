import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import TextItem from '../../components/TextItem';
import RecCategory from '../../components/RecCategory';
import moment from 'moment';
import Emoji from 'react-native-emoji';
import _ from 'lodash';

const Recr = ({ recr, recs  }) => {

  const Scores = (score) => {
    return _.map(score,(category,key) => {
      return (
        <View key={key} style={styles.scoreRow}>
          <View style={styles.category}><Text style={styles.text}>{key}</Text></View>
          <View style={styles.score}><Text style={styles.text}>{category.score}</Text></View>
        </View>
      );
    })
  }

  const Recs = (recs) => {
    return _.map(recs,(rec,key) => {
      return (
        <View key={key} style={styles.scoreRow}>
          <View style={styles.category}><Text style={styles.text}>{rec.title}</Text></View>

        </View>
      );
    })
  }

  return (

    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <TextItem title={recr.name} icon={'smiley'} size={3} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Score Information</Text>
        <View style={styles.scores}>
          {Scores(recr.score)}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Recommendations by {recr.name}</Text>
        <View>
          {Recs(recs)}
        </View>
      </View>


    </View>

  );
};


export default Recr;
