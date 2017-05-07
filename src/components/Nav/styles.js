import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({

  // ------------------------------
  // Options Container

  optionsContainer: {
    borderWidth: 0,
    borderColor: colors.white,
    flexDirection: 'row',
    marginTop: 5,
  },

  // ------------------------------
  // Option Text

  optionText: {
    color: '#fff',
    backgroundColor: colors.purple,
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '400',
    paddingVertical: 2,
    letterSpacing: -0.5,
    borderWidth: 1,
    borderColor: colors.white,
    width: 90,
    textAlign: 'center',
  },

  // ------------------------------
  // Title

  title: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '500',
    paddingTop: 7
  },

  // ------------------------------
  // Button

  button: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    padding: 11
  },
});
