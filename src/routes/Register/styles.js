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
  status: {
    marginLeft: 10,
    color: 'grey',
  },
  error: {
    marginLeft: 10,
    color: 'red',
  },
  buttonContainer: {
    margin: 10,
    padding: 10,
    // backgroundColor: colors.grey,
  },

  inputContainer: {
    // backgroundColor: 'yellow',
    margin: 10,
    padding: 2,
  },

  input: {
    ...text,
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 5,
    height: 50,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    backgroundColor: 'white',
  },

});
