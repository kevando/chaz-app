import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
// import * as Animatable from 'react-native-animatable'
// import moment from 'moment'
import styles from './styles';
import { Title } from '../../components/Generic'
import { CardGodView } from '../../components/Rec'

const GodView = (props) => {
  console.log('GodView',props)
  const { allRecs } = props

  return (
    <ScrollView style={styles.container}>
      <Title>Everything</Title>
      {
        _.map(props.allRecs,(rec,i ) => {return (
          <CardGodView generic rec={rec} key={i} />
        )})
      }





    </ScrollView>
  );
}

export default GodView;
