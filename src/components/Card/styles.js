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
  // backgroundShadow: {
  //   borderColor: '#aaa',
  //   shadowColor: '#555',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3
  //   },
  //   shadowRadius: 15,
  //   shadowOpacity: 1.0
  //
  // },

  headerContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center', // v
    marginBottom: 5,
  },
  friendContainer: {
    // backgroundColor: 'yellow',
    flex: 6,
  },
  iconContainer: {
    // backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'flex-end', // align right
  },
  bodyContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-start', // v
  },

  inputTitle: {
    ...text,
    flex:1,
  },
  inputFriend: {
    ...text,
    fontSize: 20,
    color: colors.grey,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
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
  },

  translucentBackground: {
    backgroundColor: 'rgba(255,255,255,0.9)',

    borderColor: 'purple',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
  }


});
