import { StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    // backgroundColor:'yellow',
  },
  queueContainer: {
    // backgroundColor:'yellow',
    flexDirection: 'row',
  },


  button: {
    ...text,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 0,
    fontSize: 17,
    fontWeight: '500',
    borderWidth: 1,
  },



});
