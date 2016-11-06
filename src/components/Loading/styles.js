import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  heart: {
    fontSize: 70,

  },
  text: {
    fontSize: 15,
    color: colors.grey,
    marginTop:20,
  }
});
