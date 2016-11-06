import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingTop: 70,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center', // horizontal align
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
    marginBottom: 25,
    alignItems: 'center',
  },
  logo: {
    width: 125,
    height: 125,
  },
  title: {
    fontSize: 70,
    color: colors.white,
    fontWeight: '500',
    // fontStyle: 'italic',
  },
  subHeaderText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '300',
    fontStyle: 'italic',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
