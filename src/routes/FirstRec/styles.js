import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT, width } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.blueBG,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: MARGIN_LEFT,
  },
  greetingContainer: {
    padding: 0,
    marginVertical: 20,
    // marginHorizontal: 20,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    paddingRight: 70,
    // paddingLeft: 10,
  },

  greetingText: {
    ...text,
    color: 'white',
    fontSize: 35,
    height: 39,
    lineHeight: 39,
    paddingVertical: 0,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0)',
  },

  inputTitle: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    ...text,
    // flex: 1,
    fontSize: 30,

    height: 45,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,255,255,0.8)',
    paddingLeft: 3,
    marginRight: 50,
    color: 'rgba(255,255,255,0.8)',
    // backgroundColor: colors.lightWhite
  },
  inputFriend: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    ...text,
    // flex: 1,
    fontSize: 30,

    height: 45,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,255,255,0.8)',
    paddingLeft: 3,
    marginRight: 50,
    marginTop: 30,
    color: 'rgba(255,255,255,0.8)',
    // backgroundColor: colors.lightWhite
  },
  titleText: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    ...text,
    // flex: 1,
    fontSize: 30,

    // height: 45,
    // borderBottomWidth: 3,
    // borderBottomColor: 'rgba(255,255,255,0.8)',
    // paddingLeft: 3,
    // marginRight: 50,
    color: 'rgba(255,255,255,0.99)',
    // backgroundColor: colors.lightWhite
  },

  subTitle: {
    ...text,
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
    marginBottom: 0,
    marginTop: 30,
  },
  paragraph: {
    ...text,
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
    fontWeight: '400',
    marginBottom: 30,
  },
  ghostButton: {
    ...text,
    color: 'white',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    // paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 10,
    // flex: 1,
    width: width-140,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    // width: 200,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  feelingQuestionContainer: {

  },
  feelingQuestionText: {
    ...text,
    color: 'white',
    fontSize: 28,
    fontWeight: '300',
    paddingVertical: 0,
  },
  feelingOptionsContainer: {
    // backgroundColor: colors.lightWhite,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },

  feelingOption: {
    // flex:
    // backgroundColor: colors.lightWhite,
    padding: 10,
    margin: 10,
    opacity: 0.9,
  },
  feelingText: {
    fontSize: 50,
  },
  welcomeContainer: {

  },
  welcomeText: {
    ...text,
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 40,
  },
  welcomeSubText: {
    ...text,
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
    // height: 39,
    // lineHeight: 39,
    paddingVertical: 0,
    // borderWidth: 3,
    // borderColor: 'rgba(255,255,255,0)',
  },

  timerClockEmoji: {
    fontSize: 60,

  },
  reminderOptionsContainer: {
    // backgroundColor: colors.lightWhite,
    marginTop: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  reminderOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center', // v
    // backgroundColor: colors.lightWhite,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 6,

  },

  reminderOptionIcon: {
    fontSize: 30,
    opacity: 0.9,
    padding: 5,

  },
  reminderOptionIconSelected: {

    opacity: 0.9,
    textShadowColor: colors.darkGrey,
    textShadowOffset: {width: 3, height: -2},
    textShadowRadius: 6,
    // backgroundColor: 'yellow',
  },

  reminderOptionText: {
    ...text,
    color: colors.white,
    fontSize: 25,
    fontWeight: '400',
    marginLeft: 10,

  },
  reminderOptionTextSelected: {
    fontWeight: '500',
  }




});
