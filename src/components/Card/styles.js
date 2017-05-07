import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 6;
const DATE_WIDTH = CARD_WIDTH / 8;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - DATE_WIDTH - 5;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 0,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: 'row',
    width: CARD_WIDTH,
    paddingVertical: 5,
    paddingLeft: 0,
    // backgroundColor: 'purple',
    // zIndex: 11
  },

  iconContainer: {
    width: ICON_WIDTH,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: TEXT_WIDTH,
    // backgroundColor: 'blue',
  },

  recContainer: {
    // backgroundColor: 'yellow'
  },

  friendContainer: {
    // backgroundColor: 'red'
  },

  dateContainer: {
    width: DATE_WIDTH,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 10,
    color: '#aaa',

  },

  icon: {
    fontSize: 35,
    textAlign: 'right',
  },

  rec: {
    ...text,
    fontSize: 22,
  },

  friend: {
    fontSize: 15,
    color: '#444',
  },

  bold: {
    fontWeight: '700',
  },


});
