import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Icon } from 'native-base';

import Button from '../../components/Button';
import styles from './styles';

const Start = (props) => {

  const { recommendations, onNewRecPress } = props;

  // Not sure if using ListItem with scrollview is a good idea, but it wokrs
  return (
    <View style={styles.container}>
    <ScrollView>


      <Text style={styles.tagline} >Someone told you about chaz, so lets start there!</Text>
      <Text style={styles.tagline} >Tap the button and and type chaz on the next screen.</Text>


    </ScrollView>
      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}

export default Start;
