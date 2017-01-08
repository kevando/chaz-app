import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Icon } from 'native-base';

import Button from '../../components/Button';
import styles from './styles';

const Dashboard = (props) => {

  const { recommendations, onNewRecPress } = props;

  // Not sure if using ListItem with scrollview is a good idea, but it wokrs
  return (
    <View style={styles.container}>
      <ScrollView>
      {
        _.map(recommendations,function({title, friend, note},i) {
          return(
            <ListItem iconLeft key={i}>
            <Icon name="ios-book" style={{ color: '#0A69FE' }} />
                <Text>{title}</Text>
                <Text>{note}</Text>
                <Text style={{color:'#888'}}>{friend}</Text>
            </ListItem>
          )
        })
      }
      </ScrollView>
      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}

export default Dashboard;
