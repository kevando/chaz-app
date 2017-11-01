import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({

  CONTAINER: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.blueBG,
  },
  GREETING: {
    padding: 25,
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
  },

  greetingText: {
    ...text,
    color: 'white',
    fontSize: 40,
    paddingVertical: 5,
  },

  inputName: {
    ...text,
    flex: 1,

    // color: 'white',
    fontSize: 40,
    // paddingVertical: 5,

    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    // fontSize: 35,
    paddingHorizontal: 5,
    marginLeft: 5,
    paddingVertical: 5,
    color: 'rgba(255,255,255,0.6)',

  },

  paragraph: {
    ...text,
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
  },

});
