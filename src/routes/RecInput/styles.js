import { StyleSheet } from 'react-native';
import { colors, text, width, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    borderTopWidth: 60,
    borderTopColor: colors.blueBG,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width,
    right: 0,
    // backgroundColor: 'transparent',// probly idea
    backgroundColor: colors.blueBG,
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 10,
    padding: 5,
    // backgroundColor:'green',
    zIndex:99,
    color: 'white',
  },
  topContainer: {
    // flex: 1,
    // backgroundColor: 'yellow'
  },
  CARD: {
  },

  input: {
    ...text,
    flex:1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
  },

  title: {
    ...text,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    // paddingVertical: 5,
    marginHorizontal: MARGIN_LEFT,
  },



   // friend list stuff

   friendsContainer: {
     padding: 3,
     marginTop: 10,
     marginHorizontal: 20,
    //  backgroundColor: 'blue',
     flexDirection: 'row',
    //  flex: 1,
     flexWrap: 'wrap',
     justifyContent: 'center',
   },
   friendTouchable: {
     backgroundColor: colors.lightWhite,
     margin: 5,
     paddingVertical: 5,
     paddingHorizontal: 10,
     borderColor: colors.lightGrey,
     borderWidth: 1,
     borderRadius: 5,
     flexDirection: 'column',
    //  flex: 1,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
   },
   friendText: {
     ...text,
     fontSize: 12,
     color: 'white',
     paddingHorizontal: 4,
    //  paddingLeft:15,
    //  backgroundColor: 'purple',
    //  flexDirection: 'row',
    //  flex: 1,

   },
   friendIcon: {
     // backgroundColor: 'green',
     color: colors.grey,

   },

});
