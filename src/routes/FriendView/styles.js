import { StyleSheet, Dimensions } from 'react-native';
import { colors, text, MARGIN_LEFT } from '../../config/styles';


export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueBG,
    paddingTop: 0,

  },
  scrollContainer: {
    paddingHorizontal: MARGIN_LEFT,
    // paddingTop: 30,
    paddingBottom:200,
    marginBottom:0,
    // backgroundColor: 'yellow'
  },
  title: {
    ...text,
    color: colors.black,
    fontSize: 30,
    paddingTop:20,
    paddingBottom: 0,
    fontWeight: '400',
    letterSpacing:4,
    paddingLeft: 17,

  },
  paragraph: {
    ...text,
    color: colors.black,
    fontSize: 22,
    fontWeight: '300',
    lineHeight:30,
    marginTop:25,
    paddingLeft: 20,
    paddingRight: 10,
  },


  label: {
    ...text,
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: '400',
    lineHeight:20,
    marginTop:25,
    marginLeft: 12,
    paddingRight: 10,
  },

});
