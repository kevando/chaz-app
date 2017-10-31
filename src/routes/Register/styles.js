import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.purple,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 5,
    // backgroundColor: colors.green,
  },
  buttonContainer: {
    margin: 0,
    padding: 0,
    // backgroundColor: colors.grey,
  },

  title: {
    ...text,
    color: colors.white,
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  text: {
    ...text,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 20,
  },


  status: {
    marginLeft: 10,
    color: 'grey',
  },
  error: {
    marginLeft: 10,
    color: 'red',
  },





  inputContainer: {
    // backgroundColor: 'yellow',
    marginTop: 50,
    marginHorizontal: 40,
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
