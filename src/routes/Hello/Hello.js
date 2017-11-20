import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles';
import * as Onboarding from './Components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'


// NameInput = Animatable.createAnimatableComponent(TextInput);


const Hello = (props) => {



  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.contentContainer}>

        <Onboarding.Name {...props} />
        <Onboarding.FeelingQuestion {...props} />
        <Onboarding.WelcomeMessage {...props} />

      </View>


        <Onboarding.HelloButton {...props} />
        <KeyboardSpacer />

      </View>
    );


}

export default Hello;
