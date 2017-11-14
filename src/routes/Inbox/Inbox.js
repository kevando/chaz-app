import React from 'react';
import { View , ScrollView, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import EnableNotifications from '../../components/EnableNotifications'
import { Label, Title } from '../../components/Generic';
import { Card } from '../../components/Rec';

import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import styles from './styles';

const Inbox = ({inbox, openRecs, myInvites, acceptOpenRec}) => {


  return (
    <ScrollView style={styles.container}>

      <Title>Inbox</Title>

      {
        _.map(inbox,(rec,i)=> {
          return (<Card inbox rec={rec} key={i} acceptOpenRec={acceptOpenRec}/>)
        })
      }





    </ScrollView>
  );
}

export default Inbox;
