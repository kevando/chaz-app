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
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    backgroundColor: 'white',
    flex: 1,

  },

  // waterBackdrop: {
  //   shadowColor: 'blue',
  //   shadowRadius: 5,
  //   shadowOpacity: 1.0
  //
  // },

  backgroundShadow: {
    borderColor: '#aaa',
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 15,
    shadowOpacity: 1.0

  },
  headerContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center', // v
    marginBottom: 5,
  },
  friendContainer: {
    // backgroundColor: 'grey',
    flex: 6
  },
  iconContainer: {
    flex: 1,
    // backgroundColor: 'green',
  },

  bodyContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-start', // v
    // flex: 1,
  },

  inputTitle: {
    ...text,
    flex:1,
    // fontSize: 20,
    // padding: 5,
    // paddingLeft: 10,
    // backgroundColor: 'grey',
    // height: 250,
    // flex: 1,
    // maxHeight: 160,
    // height: 100

  //
  },
  inputFriend: {
    ...text,
    // flex:1,
    fontSize: 20,
    // padding: 5,
    // paddingLeft: 10,
    color: colors.pink,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    // height: 250,
    // flex: 1,
    // maxHeight: 160,
    // height: 100
  //
  },

  icon: {
    fontSize: 35,
    textAlign: 'right',
  },

  recText: {
    ...text,
    fontSize: 19,
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
