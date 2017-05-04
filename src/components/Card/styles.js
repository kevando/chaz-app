import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 5;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - 5;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 10,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    flexDirection: 'row',
    width: CARD_WIDTH,
    paddingVertical: 10,
    paddingLeft: 10,
  },

  textContainer: {
    width: TEXT_WIDTH,
  },

  recContainer: {
    // backgroundColor: 'yellow'
  },

  friendContainer: {
    // backgroundColor: 'red'
  },

  icon: {
    fontSize: 35,
    textAlign: 'right',
  },

  rec: {
    ...text,
    fontSize: 25,
  },

  friend: {
    fontSize: 15,
    color: '#444',
  },

  bold: {
    fontWeight: '700',
  },


});
