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
  welcomeContainer: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingTop: 10,
  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 80,
    paddingTop:50,
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

  stepsContainer: {
    flex: 1,
    // backgroundColor: 'blue'
  },
  step: {
    margin: 10,
    padding: 10,
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center', // h align
  },
  stepText: {
    ...text,
    color: colors.white,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '300',

  },
  iconsContainer: {
    flex: 1,
    marginTop:5,
    // backgroundColor: 'green',
    //
    justifyContent: 'center' // v center
  },
  icon: {
    position: 'absolute',
    backgroundColor:'transparent',
  },
  howButton: {
    fontSize: 15,
    color: 'white',
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 2,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 150,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 17,
  }

});
