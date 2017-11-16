import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles';
import {Button}  from '../../components/Generic';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather'

import { ConfirmationCard } from '../../components/Rec'



class FirstRecConfirmation extends Component {



render() {
  const { unfinished,onSaveRecPress } = this.props
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.contentContainer}>

        <ConfirmationCard rec={unfinished} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.chazDescription}>Recommendations are gifts from people who know us best.</Text>
          <Text style={styles.chazDescription}>Next time someone recommends a book, or a movie - or anything at all - save it in <Text style={styles.bold}>chaz</Text></Text>

        </View>


      </View>


        <Button animated fat rounded text="Save Recommendation" onPress={onSaveRecPress} />


      </View>
    );
}

}

export default FirstRecConfirmation;
