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
    fontSize: 90,
    textAlign: 'center',
    paddingTop:80,
    paddingBottom: 0,
    fontWeight: '600',
    letterSpacing:4
  },
  tagline: {
    color: '#fff',
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight:37,
  },
  button: { // not used but keeping for the dimension code
    marginTop: 100,
    width: BUTTON_WIDTH,
    marginLeft: MARGIN_HORIZONTAL,

  },
});
