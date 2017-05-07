import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,

  },
  title: {
    color: '#fff',
    fontSize: 80,
    paddingTop:60,
    paddingBottom: 0,
    fontWeight: '500',
    letterSpacing:4,
    paddingLeft: 17,

  },
  tagline: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '300',
    lineHeight:30,
    marginTop:15,
    paddingLeft: 20,
    paddingRight: 10,
  },
  button: { // not used but keeping for the dimension code
    marginTop: 100,
    width: BUTTON_WIDTH,
    marginLeft: MARGIN_HORIZONTAL,

  },
});
