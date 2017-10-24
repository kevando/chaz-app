import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.backgroundGrey,
  },
  signoutButton: {
    fontSize: 8,

    color: colors.lightGrey,
    // backgroundColor: colors.grey,
  },
  //
  // inputContainer: {
  //   // backgroundColor: 'yellow',
  //   margin: 10,
  //   padding: 2,
  // },

  title: {
    ...text,
    textAlign: 'center',
    fontSize: 30,
    paddingLeft: 15,
    paddingTop: 5,
    height: 50,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    color: colors.grey
  },

});
