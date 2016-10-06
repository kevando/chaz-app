import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import RecListItem from '../../components/RecListItem';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';



const Recs = ({ recsReady, onRecPress, selector }) => {
  if (!recsReady) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <MeteorListView
        contentContainerStyle={styles.list}
        collection="recs"
        selector={selector}
        enableEmptySections={true}
        renderRow={(rec) => <RecListItem rec={rec} onPress={ () => onRecPress(rec) }/>}
      />
    </View>
  );
};

Recs.propTypes = {
  recsReady: PropTypes.bool,
  onRecPress: PropTypes.func
};

export default Recs;
