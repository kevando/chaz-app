import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles';
import { Button } from '../../components/Generic';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'

NameInput = Animatable.createAnimatableComponent(TextInput);


const Hello = ({ question, nameInput, onChangeText, onSaveNamePress, myInvites, onGetStartedPress, onYesPress }) => {


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
            style={[styles.inputName,{borderBottomColor: myInvites ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.4)',color: myInvites ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.6)'}]}
            onChangeText={(nameInput) => onChangeText(nameInput)}
            caretHidden={false}
            selectionColor={'rgba(255,255,255,0.4)'}
            editable={!myInvites}
          />
        </Animatable.View>


      {
        myInvites && myInvites.length >= 0 && !question &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>Welcome to chaz</Text>
            <Text style={styles.paragraph}>An app designed to build empathy</Text>
            <View style={{paddingTop: 10,paddingLeft: 20}}>
              <Icon name="heart" style={{fontSize: 120, color: colors.lightWhite }} />
            </View>
          </Animatable.View>
      }

      {
        myInvites && question &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>{question}</Text>
            <Button bgcolor='green' rounded fat animated text="YEP" onPress={onYesPress} />
            <Button bgcolor='red' rounded fat animated text="NO" onPress={()=>alert('dont lie')} />
          </Animatable.View>
      }


              {!nameInput && <Animatable.Text animation="fadeIn" delay={10000} style={{marginLeft: 20, color:'white',fontSize:12,}}>What's your name?</Animatable.Text>}
              </View>

              {nameInput != '' && !myInvites && <Button animated text="Yep. That's my name" onPress={onSaveNamePress} />}

              {myInvites && !question && <Button bgcolor={myInvites.length > 0 ? 'pink' : 'green'} rounded fat animated text="Get Started" onPress={onGetStartedPress} />}


        <KeyboardSpacer />

      </View>
    );


}

export default Hello;
