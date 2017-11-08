import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
// import _ from 'lodash';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Button, Label } from './Generic';
// import styles from './styles';
import { colors, text } from '../config/styles'
// import * as Animatable from 'react-native-animatable';
// import { Actions } from 'react-native-router-flux';



export class PhoneInput extends Component {


  _onChange = (phoneNumber) => {
    const { updateState } = this.props
    updateState({
      phoneNumber,
      validPhoneNumber: phoneNumber.length == 10,
    })
  }

  render() {
    // console.log('input',this.props)
    const { phoneNumber, errorMessage, inputProps } = this.props

    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={false}
          keyboardType='phone-pad'
          multiline={false}
          style={styles.inputPhone}
          placeholderTextColor="#aaa"
          onChangeText={value => this._onChange(value)}
          placeholder={'Phone number'}
          value={phoneNumber}
          {...inputProps}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    marginTop: 50,
    marginHorizontal: 50,
    padding: 2,
  },

  errorText: {
    // color: colors.red,
    color: 'white',
    fontSize: 12,
    marginTop: 2,
    padding: 3,
    fontFamily: 'Courier'
  },
  inputPhone: {
    ...text,
    fontSize: 30,
    paddingLeft: 15,
    paddingTop: 5,
    height: 50,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
    borderWidth: 1,
    backgroundColor: 'white',
    letterSpacing: 13,

  },
})
