import { StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  input: {
    ...text,
    flex:1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
  }

});
