import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Icon } from 'native-base';

import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles';

const Dashboard = (props) => {

  const { recommendations, onNewRecPress } = props;

  // Not sure if using ListItem with scrollview is a good idea, but it wokrs
  return (
    <View style={styles.container}>
      <ScrollView>
      {
        _.map(recommendations,function(rec,i) {
          return(
            <Card rec={rec} key={i} />
          )
        })
      }
      </ScrollView>
      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}

export default Dashboard;
