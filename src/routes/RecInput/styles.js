import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  inputContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttons: {
    // flexDirection: 'column',
    justifyContent: 'flex-end',
    // alignSelf: 'flex-end'
  },
  error: {
    height: 28,
    justifyContent: 'center',
    width: window.width,
    alignItems: 'center',
  },
  errorText: {
    color: colors.errorText,
    fontSize: 14,
  },
  header: {
    margin: 15,
    flexDirection:'row', // so text does not wrap
  },
  logo: {
    width: 125,
    height: 125,
  },

  subHeaderText: {
    fontSize: 20,
    color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
