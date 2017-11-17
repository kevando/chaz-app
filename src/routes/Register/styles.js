import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, width } from '../../config/styles';

const BUTTON_WIDTH = 250;
const MARGIN_HORIZONTAL = (window.width - BUTTON_WIDTH) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 5,
    // backgroundColor: colors.blueBG,
  },

  contentContainer: {
    flex: 1,
    // paddingTop: 5,
    // backgroundColor: colors.green,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 0,
    padding: 0,
    // backgroundColor: colors.grey,
  },
  zapIconsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  zapIcon: {
    margin: 15,
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
    // marginHorizontal: 0,
    padding: 2,
  },

  errorText: {
    color: colors.red,
    backgroundColor: 'white',
    fontSize: 12,
    marginTop: 2,
    padding: 3,
    fontFamily: 'Courier'
  },
  inputPhone: {
    ...text,
    fontSize: 35,
    paddingLeft: 15,
    paddingTop: 5,
    height: 50,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
    borderWidth: 1,
    backgroundColor: 'white',
    letterSpacing: 44,
    width: 300,
    maxWidth: width-30,

  },
  inputCode: {
    ...text,
    fontSize: 30,
    paddingLeft: 15,
    paddingTop: 5,
    height: 70,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    backgroundColor: 'white',
    width: 200,
    maxWidth: width-30,
  },

  invitationsContainer: {
    flex: 1,
    paddingTop: 5,
    marginTop: 10,
    // backgroundColor: colors.green,
  },

});
