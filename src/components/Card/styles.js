import { StyleSheet } from 'react-native';
import { colors, text, width, height } from '../../config/styles';

// const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const MARGIN_VERTICAL = 5;
const CARD_WIDTH = (width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 8;
const DATE_WIDTH = CARD_WIDTH / 8;
const ARROW_WIDTH = 25;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - ARROW_WIDTH - 44;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: 0,
    marginVertical: MARGIN_VERTICAL,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.white,
    // borderRadius: 10,
    // paddingVertical: 10,
    // paddingLeft: 20,
    // flex: 1,
    // backgroundColor: 'orange',
    justifyContent: 'flex-start',

  },

  headerContainer: {
    backgroundColor: colors.cardHeader,
    // flex: 1,
    paddingLeft: 10,
    height: 25,
    // alignItems: 'center', // h
    justifyContent: 'center', // v
  },
  bodyContainer: {
    backgroundColor: 'white',
    // flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center', // v
    justifyContent: 'center', // h (sorta)
  },

  headerText: {
    ...text,
    fontSize: 12,
    color: 'grey',
  },



  iconContainer: {
    width: ICON_WIDTH,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingTop: 8,
  },
  textContainer: {
    width: TEXT_WIDTH,// might need to change this
    // backgroundColor: 'blue',
  },

  arrowContainer: {
    width: ARROW_WIDTH,// might need to change this
    // backgroundColor: 'blue',
  },

  deleteContainer: {
    // backgroundColor:'yellow',
    width: ARROW_WIDTH,
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
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
  },

  friendText: {
    fontSize: 10,
    color: colors.darkGrey,
    lineHeight: 17,
    fontWeight: '100'
    // backgroundColor:'blue',

  },

  bold: {
    fontWeight: '700',
    // color: colors.darkGrey
  },

  pickerContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: MARGIN_VERTICAL,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingVertical: 10,

    justifyContent: 'flex-start',
    // alignItems: 'center', // vertical align
  },

  categoryTouchable: {
    // flexDirection: 'column',
    // backgroundColor: 'red',
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginHorizontal: MARGIN_HORIZONTAL,
    paddingVertical: MARGIN_VERTICAL,
  },

  categoryOptionText: {
    ...text,
    fontSize: 14,
    fontWeight: '300',
    color: colors.blue,

  },

  // searching for user
  inputContainer: {
    // flex: 1,
    width: TEXT_WIDTH,// might need to change this
  },
  input: {
    ...text,
    fontSize: 20,
    paddingLeft: 0,
    paddingTop: 5,
    height: 50,
    // borderColor: colors.lightGrey,
    borderBottomWidth: 0,
    // backgroundColor: 'yellow',
  },

  label: {
    ...text,
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: '400',
    lineHeight:20,
    // marginTop:25,
    marginLeft: 12,
    paddingRight: 10,
  },

  backgroundShadow: {
    borderColor: '#aaa',
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 15,
    shadowOpacity: 1.0

  }


});
