import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.purple,

  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 80,
    paddingTop:70,
    paddingBottom: 0,
    fontWeight: '400',
    letterSpacing:4,
    paddingLeft: 17,

  },

});
