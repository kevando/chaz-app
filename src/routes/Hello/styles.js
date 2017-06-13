import { StyleSheet, Dimensions } from 'react-native';
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
    paddingTop:20,
    paddingBottom: 0,
    fontWeight: '400',
    letterSpacing:4,
    paddingLeft: 17,

  },
  paragraph: {
    ...text,
    color: colors.white,
    fontSize: 22,
    fontWeight: '300',
    lineHeight:30,
    marginTop:25,
    paddingLeft: 20,
    paddingRight: 10,
  },
  button: { // not used but keeping for the dimension code
    marginTop: 100,
    width: BUTTON_WIDTH,
    marginLeft: MARGIN_HORIZONTAL,

  },
});
