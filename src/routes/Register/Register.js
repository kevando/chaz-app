import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import _ from 'lodash';
import { Button, Label } from '../../components/Generic';
import styles from './styles';
import { colors } from '../../config/styles'


const Register = (props) => {

  return (
    <View style={styles.container}>

      <Steps app={props.app} />

      <PhoneNumberInput {...props} />
      <VerificationCodeInput {...props} />

      <Text>app status: {props.app.status}</Text>
      <Text>app error: {props.error.message}</Text>

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
    <View style={{padding: 2, flexDirection: 'row'}}>

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

    <Button text="Sign In" onPress={onSignInPress} />

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


        <Button text="Confirm Code"  onPress={confirmCode} />
      </View>

  )
}

export default Register;
