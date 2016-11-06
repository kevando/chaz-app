import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingTop:100,
  },
  buttons: {
    flexDirection: 'row',
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
    fontSize: 60,
    color: '#fff',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  subHeaderText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
