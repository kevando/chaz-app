import { StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },

  title: {
    ...text,
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
  },

  buttonContainer: {
    marginTop:50,
    marginHorizontal: 20,
  },


});
