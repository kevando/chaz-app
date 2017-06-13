import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const MARGIN_VERTICAL = 5;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 9;
const DATE_WIDTH = CARD_WIDTH / 8;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - DATE_WIDTH - 5;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: MARGIN_VERTICAL,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingLeft: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  expanded: {
    borderColor: colors.grey,
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

  recText: {
    ...text,
    fontSize: 17,
    fontWeight: '400',
    color: colors.black,
    // backgroundColor: 'red',
    lineHeight: 16,
  },

  friendText: {
    fontSize: 12,
    color: colors.darkGrey,
    lineHeight: 17,
    fontWeight: '100'
    // backgroundColor:'blue',

  },

  bold: {
    fontWeight: '500',
    // color: colors.darkGrey
  },


});
