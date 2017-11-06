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

      <Text style={styles.title} onPress={props.registerAsTest}>Activate chaz</Text>
      <Text style={styles.text} onPress={props.loginAsTest}>Enjoy all the benefits of an activated chaz account by verifying your phone number</Text>

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
      <Text style={styles.text} onPress={resetPhoneNumber}>{app.signInAttemps > 0 && 'Get new code'}</Text>

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

  const { getCode } = props

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Activated!</Text>
        <Animatable.View animation="bounceIn" delay={400} style={{alignItems: 'center'}}>
          <AwesomeIcon name="heart" size={160} color={colors.yellow} />
        </Animatable.View>

        </View>

        <Button text="Back to Dashboard" onPress={()=> Actions.reset('lightbox')} />
    </View>
  )
}




// ------------------------------------


const Register = (props) => {

  return (
    <View style={styles.container}>

      <Steps app={props.app} />

      <PhoneNumberInput {...props} />
      <VerificationCodeInput {...props} />

      <Text onPress={props.loginAsTest}>TEST LOGIN</Text>
      <Text>.</Text>

      <Text>.</Text>
      <Text onPress={props.registerAsTest}>TEST REGISTER</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text onPress={props.onLogoutPress}>LOGOUT</Text>

    </View>
  );
}

const Steps = (props) => {

  const Circle = ({step, active, text}) => {
    const status = active == step ? 'active' : active > step ? 'complete' : 'pending'

    return (

      <View style={{height: 70, flex: 1, margin: 5, justifyContent: 'flex-start', alignItems: 'center'}} >
        <View style={{borderWidth: 2, borderRadius: 40,width: 30, height: 30,justifyContent: 'center', alignItems: 'center', borderColor: status=='pending' ? 'grey' : colors.blue ,backgroundColor: status=='active' ? 'white' : status=='complete' ? colors.blue : 'transparent'}}>
          <Text style={{textAlign: 'center', color: status=='active' ? colors.blue : status=='complete' ? 'white' : 'grey',  }}>{step}</Text>
          </View>
        <Text style={{textAlign: 'center', fontSize: 10,marginTop: 5, color: status=='active' ? colors.blue: 'grey'}}>{text}</Text>
      </View>

    )
  }


  const activeStep = props.app.activeStep || 1

  return (
    <View>
    <Label center>{activeStep == 1 ? 'Activate chaz by entering your phone number.' : activeStep ==2 ? 'Enter Verification code you got via text' : 'Active your account'}</Label>
    <View style={{padding: 2, flexDirection: 'row',marginHorizontal: 60,}}>

      <Circle step={1} active={activeStep} text="Phone" />
      <Circle step={2} active={activeStep} text="Code" />
      <Circle step={3} active={activeStep} text="Active" />

    </View>

    </View>

  );
}


const PhoneNumberInput = (props) => {

  // return null
  if(props.app.confirmResult) { return null }

  const { phoneNumber, updateState, onSignInPress } = props

  return (
    <View>



    <View style={styles.inputContainer}>
      <TextInput
        ref={ c => this._title = c }
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType='phone-pad'
        multiline={false}
        style={styles.input}
        placeholderTextColor="#aaa"

        onChangeText={value => updateState({ phoneNumber: value })}
        placeholder={'Phone number ... '}
        value={phoneNumber}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button text="Get Code" onPress={onSignInPress} />
    </View>

    </View>
  )
}

const VerificationCodeInput = (props) => {
  // return null
  if(!props.app.confirmResult) { return null }

  const { updateState, confirmCode, codeInput } = props

  return (

      <View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='phone-pad'
            multiline={false}
            style={styles.input}
            placeholderTextColor="#aaa"

            onChangeText={value => updateState({ codeInput: value })}
            placeholder={'Code ... '}
            value={codeInput}
          />
        </View>

        <View style={styles.buttonContainer}>
        <Button text="Confirm Code"  onPress={confirmCode} />
        </View>
      </View>

  )
}

export default Register;
