import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import RecListItem from '../../components/RecListItem';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';



const Recs = ({ recsReady, onRecPress, selector }) => {
  if (!recsReady) {
    return <Loading />;
  }



  return (
    <ScrollView style={styles.container}>
      <MeteorListView
        contentContainerStyle={styles.list}
        collection="recs"
        selector={selector}
        options={{sort: {createdAt: -1}}}
        enableEmptySections={true}
        renderRow={(rec) => <RecListItem rec={rec} onPress={ () => onRecPress(rec) }/>}
      />
  </ScrollView>
  );
};

Recs.propTypes = {
  recsReady: PropTypes.bool,
  onRecPress: PropTypes.func
};

export default Recs;
