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
    fontSize: 15,
    fontWeight: '400',
    // borderWidth: 1,
    color: colors.blue,
    textAlign: 'center'
  },



});
