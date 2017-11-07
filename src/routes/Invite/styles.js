import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueBG,
    paddingTop: 30, // no nav
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    // color: 'white',
    zIndex: 999,
    // backgroundColor: 'red',
    padding: 5,
  },


});
