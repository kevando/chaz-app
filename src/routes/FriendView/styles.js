import { StyleSheet, Dimensions } from 'react-native';
import { colors, text, MARGIN_LEFT } from '../../config/styles';


export default styles = StyleSheet.create({


  scrollContainer: {
    // paddingHorizontal: MARGIN_LEFT,
    // marginTop: 30,
    // paddingBottom:200,
    marginBottom:0,
    // backgroundColor: 'yellow'
  },

  tableContainer: {
    flex: 1,
    // backgroundColor: colors.lightWhite,
    marginBottom: 30,

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: colors.lightWhite,

  },
  colLeft: {
    flex: 5,
    // backgroundColor: colors.lightWhite,
  },
  colRight: {
    flex: 1,
    // backgroundColor: colors.lightWhite,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  friendEmoji: {
    fontSize: 25,
    marginBottom: 5,
    // marginRight: -15,
  },
  valueText: {
    ...text,
    fontSize: 17,
    fontWeight: '200',
    color: colors.white,
    paddingVertical: 3
  }

});
