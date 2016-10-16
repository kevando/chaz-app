import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    margin: 0,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 17,
    fontWeight: '500',
    marginLeft:5
  },
});
