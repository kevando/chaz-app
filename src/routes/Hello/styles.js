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
    fontSize: 40,
    textAlign: 'center',
  },
  tagline: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 100,
    width: BUTTON_WIDTH,
    marginLeft: MARGIN_HORIZONTAL,

  },
});
