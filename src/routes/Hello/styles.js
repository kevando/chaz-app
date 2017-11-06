import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.blueBG,
  },
  greetingContainer: {
    padding: 0,
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    paddingRight: 70,
    // paddingLeft: 10,
  },

  greetingText: {
    ...text,
    color: 'white',
    fontSize: 35,
    height: 39,
    lineHeight: 39,
    paddingVertical: 0,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0)',
  },

  inputName: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    ...text,
    flex: 1,
    fontSize: 35,

    height: 39,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    paddingLeft: 3,
    marginLeft: 0,
    color: 'rgba(255,255,255,0.8)',
  },

  subTitle: {
    ...text,
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
    marginBottom: 0,
    marginTop: 30,
  },
  paragraph: {
    ...text,
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
    fontWeight: '400',
    marginBottom: 30,
  },

});
