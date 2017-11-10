import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { Button } from '../../components/Generic';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';

NameInput = Animatable.createAnimatableComponent(TextInput);

Animatable.initializeRegistryWithDefinitions({
  textDance: {
    0: {
      borderBottomColor: 'rgba(255,255,255,0.4)',
      color: 'rgba(255,255,255,0.8)',
      fontSize: 35,
    },
    0.4: {
      borderBottomColor: 'rgba(255,255,255,0)',
      color: 'rgba(255,255,255,1.0)',
      fontSize: 35,
    },
    0.7: {
      fontSize: 38,
    },
    1: {
      fontSize: 35,
    },
  }
});

const Hello = ({ nameInput, onChangeText, onSaveNamePress, myInvites, onGetStartedPress }) => {


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <View style={styles.container}>
        <Animatable.View style={styles.greetingContainer} >
          <Text style={styles.greetingText}>Hello</Text>
          <NameInput
            placeholder=''
            ref={c => this.nameInput = c}
            autoCapitalize="words"
            value={nameInput}
            autoCorrect={false}
            autoFocus={nameInput==''}
            placeholderTextColor="#aaa"
            multiline={false}
            style={styles.inputName}
            onChangeText={(nameInput) => onChangeText(nameInput)}
            caretHidden={false}
            selectionColor={'rgba(255,255,255,0.4)'}
            editable={!myInvites}
          />
        </Animatable.View>


      { myInvites && myInvites.length >= 0 &&

        <Animatable.View animation="fadeInUp" >
          <Text style={styles.subTitle}>Welcome to chaz</Text>
          <Text style={styles.paragraph}>An app designed to build empathy</Text>

        </Animatable.View>
      }


              {!nameInput && <Animatable.Text animation="fadeIn" delay={10000} style={{color:'white',fontSize:12,}}>What's your name?</Animatable.Text>}
              </View>

              {nameInput != '' && !myInvites && <Button animated text="Yep. That's my name" onPress={onSaveNamePress} />}

              {myInvites && <Button bgcolor={myInvites.length > 0 ? 'pink' : 'green'} rounded fat animated text="Get Started" onPress={onGetStartedPress} />}


        <KeyboardSpacer />

      </View>
    );


}

export default Hello;
