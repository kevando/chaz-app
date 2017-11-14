import { StyleSheet } from 'react-native';
import { colors, text, width } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    borderTopWidth: 60,
    borderTopColor: colors.blueBG,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width,
    right: 0,
    // backgroundColor: 'transparent',// probly idea
    backgroundColor: colors.blueBG,
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 10,
    padding: 5,
    // backgroundColor:'green',
    zIndex:99,
    color: 'white',
  },

  contentWrapper: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 10,
  },

  row: {
    // flex: 1,
    // backgroundColor: colors.newBlue,
    flexDirection: 'column',
    padding: 10,
    margin: 5,
  },
  keyText: {
    ...text,
    color: 'black',
    fontSize: 18,
    fontWeight: '800'
  },
  fieldText: {
    ...text,
    color: 'black',
    fontSize: 15,
    fontWeight: '300'
  },
});
