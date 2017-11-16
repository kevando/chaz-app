import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash'
import moment from 'moment'
import styles from './styles';
import { colors } from '../../config/styles';
import { Button } from '../../components/Generic';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'


NameInput = Animatable.createAnimatableComponent(TextInput);



// --------------------------------------------------
//    NAME
// --------------------------------------------------

export const Name = (props) => {

  const { nameInput, user, onChangeText } = props

  return (
    <Animatable.View style={styles.greetingContainer} >

      {user.initialFeeling  ?
        <Animatable.Text animation="fadeIn"  style={styles.greetingText}  onPress={props.logout}>{user.initialFeeling.emoji} {user.displayName}</Animatable.Text>
        :
        <Text style={styles.greetingText} onPress={props.logout}>Hello {user.displayName}</Text>
      }

      {!user.displayName &&


      <NameInput
        placeholder=''
        ref={c => this.nameInput = c}
        autoCapitalize="words"
        value={nameInput}
        autoCorrect={false}
        autoFocus={nameInput==''}
        placeholderTextColor="#aaa"
        multiline={false}
        style={[styles.inputName,{borderBottomColor: user.displayName ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.4)',color: user.displayName ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.6)'}]}
        onChangeText={(nameInput) => onChangeText(nameInput)}
        caretHidden={false}
        selectionColor={'rgba(255,255,255,0.4)'}
        editable={!user.displayName}
        animation="fadeIn"
      />
    }
    </Animatable.View>
    );


}

// --------------------------------------------------
//    FEELING QUESTION
// --------------------------------------------------

export class FeelingQuestion extends Component {

  _onPress = (feeling) => {
    this.refs[feeling.name].fadeOutUp()
      .then(()=> this.refs.CONTAINER.fadeOut().then(() => this.props.onFeelingPress(feeling)))
  }

  render() {

    if(this.props.user.initialFeeling || !this.props.user.displayName || this.props.showWelcome) return null;

    // -----------------------------------------------------------
    const h = moment().format("HH")
    let timeOfDay = 'today'
    timeOfDay = (h > 12 && h < 17) ? "this afternoon" : timeOfDay
    timeOfDay = (h < 12 && h < 4) ? "this morning" : timeOfDay
    // -----------------------------------------------------------


    return (
      <Animatable.View style={styles.feelingQuestionContainer} ref="CONTAINER" >
        <Text style={styles.feelingQuestionText}>How are you feeling {timeOfDay}?</Text>

        <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">

          {
            _.map(this.props.feelings, feeling => {
              return (
                <TouchableOpacity activeOpacity={1.0} key={feeling.name}  style={styles.feelingOption} onPress={()=>this._onPress(feeling)}>
                  <Animatable.Text style={styles.feelingText} ref={feeling.name}>{feeling.emoji}</Animatable.Text>
                </TouchableOpacity>
              )
            })
          }
        </Animatable.View>
      </Animatable.View>
      );
  }

}


// --------------------------------------------------
//    WELCOME MESSAGE
// --------------------------------------------------

export const WelcomeMessage = (props) => {

  if(!props.user.initialFeeling && !props.showWelcome) return null;

  return (
    <Animatable.View animation="fadeIn" style={styles.welcomeContainer} >
      <Text style={styles.welcomeText}>Thanks for trying chaz.</Text>
      <Text style={styles.welcomeSubText}>An app that attempts to build empathy by encouraging you to follow up on all the great recommendations you receive.</Text>

    </Animatable.View>
    );


}

// --------------------------------------------------
//    BUTTON
// --------------------------------------------------

export const HelloButton = (props) => {


  if(props.nameInput != '' && !props.user.displayName) {
    return (
      <Button animated text="Yep. That's my name" onPress={props.onSaveNamePress} />
    )
  } else if(props.user.initialFeeling || props.showWelcome) {
    return (
      <Button animated fat rounded text="Get Started" onPress={props.onGetStarted} />
    )
  } else {
    return null
  }



}
