import { StyleSheet } from 'react-native';
import { colors, text, width, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({

  CONTAINER: {
    // borderWidth: 4,
    // borderColor: 'green',
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    width: width,
    right: 0,
    // backgroundColor: 'transparent',// probly idea
    backgroundColor: colors.blueBG,
    justifyContent: 'flex-start',
  },
  TOP: {
    flex: 1,
  },
  CARD: {
    // backgroundColor:'yellow',
    // border: ''
    // flex: 1,
    // height: 300,
    // overflow: 'hidden',
  },

  input: {
    ...text,
    flex:1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
  },

  title: {
    ...text,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    // paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
  },

});
