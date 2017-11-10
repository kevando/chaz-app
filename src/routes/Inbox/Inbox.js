import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import EnableNotifications from '../../components/EnableNotifications'
import { Label, Title } from '../../components/Generic';
import { Card } from '../../components/Rec';

import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import styles from './styles';

const Inbox = ({openRecs}) => {


  return (
    <ScrollView style={styles.container}>

      <Title>Inbox</Title>

      {
        _.map(openRecs,(rec,i)=> {
          return (<Card listItem rec={rec} key={i} />)
        })
      }




    </ScrollView>
  );
}

export default Inbox;
