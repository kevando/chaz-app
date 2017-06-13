import { StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({

  // // ------------------------------
  // // Options Container
  //
  // optionsContainer: {
  //   borderWidth: 0,
  //   borderColor: colors.white,
  //   flexDirection: 'row',
  //   marginTop: 5,
  // },
  // ------------------------------
  // Title Container

  titleContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    borderWidth: 0,
    // borderColor: colors.white,
    flexDirection: 'row',
    // marginTop: -15,
  },

  // ------------------------------
  // Title

  title: {
    ...text,
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
    // paddingLeft: 3,
    // backgroundColor: 'transparent',
    // marginBottom:2
    // fontWeight: '500',
    // paddingTop: 7
  },



  // ------------------------------
  // Option Text
  // not used now. moving to hambyurger menu probly

  // optionText: {
  //   color: '#fff',
  //   backgroundColor: colors.purple,
  //   fontSize: 15,
  //   fontWeight: '400',
  //   paddingVertical: 2,
  //   letterSpacing: -0,
  //   borderWidth: 1,
  //   borderColor: colors.white,
  //   width: 65,
  //   textAlign: 'center',
  // },



  // ------------------------------
  // Button

  button: {
    ...text,
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    padding: 11
  },
  settingsButton: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: '400',
    padding: 11,
    // backgroundColor: 'yellow',
    opacity: 0.8,
    // marginLeft: 5,
    marginTop: -5,
  },
});
