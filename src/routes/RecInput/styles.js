import { StyleSheet } from 'react-native';
import { colors, text, width, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    // borderWidth: 4,
    // borderColor: 'green',
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    width: width,
    right: 0,
    // backgroundColor: 'transparent',// probly idea
    backgroundColor: colors.blueBG,
    justifyContent: 'flex-start',
  },
  TOP: {
    flex: 1,
  },
  CARD: {
    // backgroundColor:'yellow',
    // border: ''
    // flex: 1,
    // height: 300,
    // overflow: 'hidden',
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
     marginTop: 60,
     marginHorizontal: 20,
    //  backgroundColor: 'blue',
     flexDirection: 'row',
     flex: 1,
     flexWrap: 'wrap',
   },
   friendTouchable: {
     backgroundColor: colors.yellow,
     margin: 5,
     padding: 5,
     borderColor: colors.lightGrey,
     borderBottomWidth: 1,
     flexDirection: 'column',
    //  flex: 1,
    height: 40,
   },
   friendText: {
     ...text,
     fontSize: 12,
     color: 'black',
     paddingVertical:2,
     paddingLeft:15,
    //  backgroundColor: 'purple',
    //  flexDirection: 'row',
    //  flex: 1,

   },
   friendIcon: {
     // backgroundColor: 'green',
     color: colors.grey,

   },

});
