import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.blueBG,
  },


  title: {
    ...text,
    textAlign: 'center',
    fontSize: 30,
    paddingLeft: 15,
    paddingVertical: 25,
    color: colors.white
  },

});
