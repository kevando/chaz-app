import { StyleSheet } from 'react-native';
import { colors, title } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    flex:1,
    fontSize: 20,
    padding: 3
  },

  title: {
    ...title,
    textAlign: 'center',
    paddingVertical: 15,
  },

  buttonContainer: {
    marginTop:50,
    marginHorizontal: 20,
  },


});
