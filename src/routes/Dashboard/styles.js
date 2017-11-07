import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_HORIZONTAL } from '../../config/styles';


export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.blueBG,
  },
  titleContainer: {
    // marginLeft: MARGIN_HORIZONTAL+10,
    // backgroundColor: 'yellow',
    marginTop: 10,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  recommendationsTitle: {
    ...text,
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing:0.5,
    marginBottom: 20,
    paddingLeft: 10,
    // textShadowColor: 'red',
    // textShadowOffset: {width: 10, height: 10},
    // textShadowRadius: 20
  },
  paragraph: {
    ...text,
    color: colors.white,
    fontSize: 22,
    fontWeight: '300',
    lineHeight:30,
    marginTop:25,
    paddingLeft: 20,
    paddingRight: 10,
  },
  // button: { // not used but keeping for the dimension code
  //   marginTop: 100,
  //   width: BUTTON_WIDTH,
  //   marginLeft: MARGIN_HORIZONTAL,
  //
  // },

  stepsContainer: {
    flex: 1,
    // backgroundColor: 'blue'
  },
  step: {
    margin: 10,
    padding: 10,
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center', // h align
  },
  stepText: {
    ...text,
    color: colors.white,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '300',

  },

  icon: {
    position: 'absolute',
    backgroundColor:'transparent',
  },
  howButton: {
    fontSize: 15,
    color: 'white',
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 2,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 150,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 17,
  },

  welcomeContainer: {
    flex: 1,
    backgroundColor: colors.purple,

    paddingTop: 10,
    justifyContent: 'flex-end',
    // borderColor: 'white',
    // borderWidth: 5
  },


  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },


  title: {
    ...text,
    color: colors.white,
    fontSize: 27,
    marginBottom: 10,
    fontWeight: '700',
    letterSpacing:2,
    textAlign: 'center',
    // marginTop: 20, // spacing w pagination
  },
  text: {
    ...text,
    color: colors.white,
    fontSize: 18,
    fontWeight: '300',
    lineHeight:22,
    textAlign: 'center',
    marginHorizontal:25,
    // paddingLeft: 20,
    // paddingRight: 10,
  },

  nextText: {
    ...text,
    color: colors.white,
    fontSize: 18,
    fontWeight: '100',
    lineHeight:22,
    textAlign: 'center',
    marginHorizontal:25,
    marginTop: 70,
    // paddingLeft: 20,
    // paddingRight: 10,
  },

  // Swiper
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  slideFinal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple,
    // backgroundColor: colors.backgroundGrey,
  },

  textContainer: {
    flex: 2,
    // backgroundColor: 'orange',
  },
  imageContainer: {
    flex: 3,
    // backgroundColor: 'blue',
    justifyContent: 'center'
  },
  iconsContainer: {
    height: 200,
    // backgroundColor: 'green',
    //
    justifyContent: 'center' // v center
  },

});
