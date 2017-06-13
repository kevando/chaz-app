import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const MARGIN_VERTICAL = 5;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 9;
const DATE_WIDTH = CARD_WIDTH / 8;
const CARROT_WIDTH = 25;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - CARROT_WIDTH - 44;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: MARGIN_VERTICAL,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingLeft: 20,

    // justifyContent: 'center',
    // alignItems: 'center',

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  expanded: {
    borderColor: colors.grey,
  },

  iconContainer: {
    width: ICON_WIDTH,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  textContainer: {
    width: TEXT_WIDTH,// might need to change this
    // backgroundColor: 'blue',
  },

  deleteContainer: {
    // backgroundColor:'yellow',
    width: CARROT_WIDTH,
    position: 'absolute',
    right: 0,
    top: 3,
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
    fontSize: 19,
    fontWeight: '500',
    color: colors.black,
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
