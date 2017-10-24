import { StyleSheet } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({

  label: {
    ...text,
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: '400',
    lineHeight:20,
    marginTop:25,
    marginHorizontal: 12,
    // marginRight: 12,
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
