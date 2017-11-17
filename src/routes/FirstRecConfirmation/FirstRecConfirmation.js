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

  _onSaveRecPress = () => {
    this.refs.TEXT.fadeOut(400)
    this.refs.BUTTON.fadeOut(400)
      .then(() => {
        setTimeout(() => {
          this.refs.CARD.fadeOutDown(500)
            .then(() => {
              this.props.onSaveRecPress()
            })
        },1000)

      })
  }

  render() {
    const { unfinished,onSaveRecPress } = this.props
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <View style={styles.contentContainer}>



          <Animatable.View style={styles.descriptionContainer} ref="TEXT">
            <Text style={styles.chazDescription}>Recommendations are gifts from people who know us best.</Text>
            <Text style={styles.chazDescription}>Next time someone recommends a book, or a movie - or anything at all - save it in <Text style={styles.bold}>chaz</Text></Text>

          </Animatable.View>

          <Animatable.View ref="CARD">
            <ConfirmationCard rec={unfinished} />
          </Animatable.View>

        </View>

        <Animatable.View ref="BUTTON">
          <Button animated fat rounded text="Save Recommendation" onPress={this._onSaveRecPress} />
        </Animatable.View>

        </View>
      );
    }

}

export default FirstRecConfirmation;
