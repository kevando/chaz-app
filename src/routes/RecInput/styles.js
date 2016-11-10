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
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.black,
    margin:20,
  },
  caption: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.darkGrey,
    margin:20,
  },
});
