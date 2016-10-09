import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import RecrListItem from '../../components/RecrListItem';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';



const Recrs = ({ recrsReady, onRecrPress }) => {
  if (!recrsReady) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <MeteorListView
        contentContainerStyle={styles.list}
        collection="recrs"
        enableEmptySections={true}
        renderRow={(rec) => <RecrListItem rec={rec} onPress={ () => onRecrPress(rec) }/>}
      />
    </View>
  );
};

Recrs.propTypes = {
  recrsReady: PropTypes.bool,
  onRecrPress: PropTypes.func
};

export default Recrs;
