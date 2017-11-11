import React from 'react';
import { View ,Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather'
import { Title } from '../../components/Generic';
import { Card } from '../../components/Rec';
import { colors, text } from '../../config/styles';
import { Actions } from 'react-native-router-flux';

import * as Animatable from 'react-native-animatable'

import styles from './styles';


const Invites = ({invitations}) => {

console.log(invitations)

  return (
    <View style={styles.container}>
    <ScrollView>
      <Title>Invitations</Title>

      {
        _.map(invitations, (invitation,i) => {
          return (
            <Card invitation rec={invitation} key={i} />
          )
        })
      }
</ScrollView>
    </View>
  );
}

export default Invites;
