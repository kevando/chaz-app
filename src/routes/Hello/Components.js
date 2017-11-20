import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash'
import moment from 'moment'
import styles from './styles';
import { colors } from '../../config/styles';
import { Button } from '../../components/Generic';
import Party from '../../components/Party'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'


// NameInput = Animatable.createAnimatableComponent(TextInput);



// --------------------------------------------------
//    NAME
// --------------------------------------------------jimmy

export const Name = (props) => {

  const { nameInput, user, onChangeText, feelings } = props
  // console.warn(user.displayName)
  let inputFontSize = nameInput.length < 8 ? 35 : 30
  let nameFontSize = user.displayName && user.displayName.length < 8 ? 35 : 30
  return (
    <Animatable.View style={styles.greetingContainer} >

      {user.initialFeeling  ?
        <Animatable.Text animation="fadeIn"  style={styles.greetingText}  onPress={props.logout}>{user.displayName},</Animatable.Text>
        :
        <Text style={[styles.greetingText,{fontSize: nameFontSize}]} onPress={props.logout}>Hello {user.displayName}{user.displayName && ','}</Text>
      }

      {!user.displayName &&


      <TextInput
        placeholder=''
        ref={c => this.nameInput = c}
        autoCapitalize="words"
        value={nameInput}
        autoCorrect={false}
        autoFocus={nameInput==''}
        placeholderTextColor="#aaa"
        multiline={false}
        style={[styles.inputName,{fontSize: inputFontSize, borderBottomColor: user.displayName ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.4)',color: user.displayName ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.6)'}]}
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
    this.refs[feeling.name].fadeOutUp(300)
      .then(()=> this.refs.CONTAINER.fadeOut(200).then(() => this.props.onFeelingPress(feeling)))
  }

  render() {

    if(this.props.user.initialFeeling || !this.props.user.displayName || this.props.showWelcome) return null;

    // -----------------------------------------------------------
    const h = moment().format("HH")
    let timeOfDay = 'today'
    timeOfDay = (h > 12 && h < 17) ? "this afternoon" : timeOfDay
    timeOfDay = (h < 12 && h > 4) ? "this morning" : timeOfDay
    // -----------------------------------------------------------
    // console.warn(h)

    return (
      <Animatable.View style={styles.feelingQuestionContainer} animation="fadeIn" delay={200} duration={400} ref="CONTAINER" >
        <Text style={styles.feelingQuestionText}>How are you feeling {timeOfDay}?</Text>

        <Animatable.View style={styles.feelingOptionsContainer} ref="OPTIONS">
        {this.props.feelings.length == 0 && <Text>fetching options, hang tight</Text>}
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

  const { user } = props
  if(!user.initialFeeling && !props.showWelcome) return null;

  return (
    <Animatable.View animation="fadeIn" delay={200} duration={400} style={styles.welcomeContainer} >
      <Party partySize='small' />
      <Text style={styles.feelingQuestionText}>{user.initialFeeling.emoji}&nbsp;{user.initialFeeling.name == 'sad' ? 'Sorry to hear that, hopefully your day gets better' : 'Wonderful!'}</Text>
      <Text style={styles.welcomeText}>chaz is all about empathy</Text>
      <Text style={styles.welcomeSubText}>When someone gives you a recommendation, save it here and get encouragement to follow up.</Text>

    </Animatable.View>
    );


}

// --------------------------------------------------
//    BUTTON
// --------------------------------------------------

export const HelloButton = (props) => {


  if(props.nameInput != '' && !props.user.displayName) {
    return (
      <Button animated text={`Yep. That\'s my name${props.feelings.length == 0 ? '!' : '.'}`} onPress={props.onSaveNamePress} />
    )
  } else if(props.user.initialFeeling || props.showWelcome) {
    return (
      <Button animated fat rounded text="Get Started" onPress={props.onGetStarted} />
    )
  } else {
    return null
  }



}
