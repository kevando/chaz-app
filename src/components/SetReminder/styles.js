import { StyleSheet, Dimensions } from 'react-native';
import { colors, text, MARGIN_HORIZONTAL } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    marginTop: 30,
    marginHorizontal: MARGIN_HORIZONTAL + 10,
    padding: 1
  },

  reminderText: {
    ...text,
    fontSize: 12,
    color: colors.darkGrey,
    lineHeight: 17,
  },

});
