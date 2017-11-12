import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import _ from 'lodash';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Button, Label } from '../../components/Generic';
import styles from './styles';
import { colors } from '../../config/styles'
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';



export const PhoneInput = (props) => {

  const { getCode, phoneNumber, fadeOut, updateState, updateInput, isPhoneValid, verifyingPhone, phoneRef, app } = props

  // if(fadeOut) {
  //   this._phoneRef.bounce(800)//.then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  // }
  return (

    <View style={styles.container}>
      <View style={styles.contentContainer}>

      <Text style={styles.title}>Activate chaz</Text>
      <Text style={styles.text}>Enjoy all the benefits of an activated chaz account by verifying your phone number</Text>

      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          keyboardType='phone-pad'
          multiline={false}
          style={styles.inputPhone}
          placeholderTextColor="#aaa"
          onChangeText={value => updateInput({ phoneNumber: value})}
          placeholder={'Phone number'}
          value={phoneNumber}
        />

      </View>
    </View>

      {isPhoneValid && <Button loading={verifyingPhone} text={verifyingPhone ? 'Getting Code' : "Get Code"} onPress={getCode} />}
    <KeyboardSpacer />
    </View>
  )
}

// --------------------------------
//    VERIFY CONFIRMATION CODE
// --------------------------------

export const CodeInput = (props) => {

  const { confirmCode, verificationCode, updateInput, isCodeValid, verifyingCode, resetPhoneNumber, app } = props


  return (

    <View style={styles.container}>
      <View style={styles.contentContainer}>

      <Text style={styles.title}>Enter Code:</Text>
      <Text style={styles.text}>{app.shouldSignIn && 'Welcome back'}</Text>
      {!verificationCode && <Animatable.Text delay={5000} animation="fadeIn" style={styles.text} onPress={resetPhoneNumber}>{app.signInAttemps > 0 ? 'Get new code' : 'Try a new number'}</Animatable.Text>}

      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          keyboardType='phone-pad'
          multiline={false}
          style={styles.inputCode}
          placeholderTextColor="#aaa"
          onChangeText={value => updateInput({ verificationCode: value })}
          placeholder={'Code'}
          value={verificationCode}
        />
      </View>
    </View>

      { isCodeValid &&
        <Button loading={verifyingCode} text={verifyingCode ? 'Confirming' : "Confirm Code"} onPress={confirmCode} />}
    <KeyboardSpacer />
    </View>
  )
}

export const Confirmation = (props) => {

  const { getCode, user, app } = props

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Activated!</Text>
        <Animatable.View animation="bounceIn" delay={400} style={{alignItems: 'center'}}>
          <AwesomeIcon name="heart" size={160} color={colors.yellow} />
        </Animatable.View>

        {
          app.myInvites && app.myInvites.length > 0 &&

          <View style={styles.invitationsContainer}>
            <Label center >You were invited by:</Label>
            {
              _.map(app.myInvites,(invite,i) => {return (<Label key={i} center>{invite.from.displayName}</Label>)})
            }
          </View>
        }

      </View>
      {app.myInvites && app.myInvites.length > 0 ?
        <Button text="Accept Invitation" onPress={()=> Actions.replace('RecView', {rec: app.myInvites[0] }) } /> :
        <Button text="Go to Dashboard" onPress={()=> Actions.reset('lightbox')} /> }
    </View>
  )
}
