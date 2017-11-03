import { StyleSheet } from 'react-native';
import { colors, friend, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent:'flex-start'
  },

  input: {
    ...text,
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 5,
    height: 50,
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
    // backgroundColor: 'yellow',
  },

  friendsContainer: {
    padding: 3,
    marginTop: 20,
    marginHorizontal: 20,
  },
  friendTouchable: {
    // backgroundColor: 'yellow',
    margin: 5,
    padding: 5,
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  friendText: {
    ...text,
    color: colors.darkGrey,
    paddingVertical:2,
    paddingLeft:15,
    // backgroundColor: 'purple',


  },
  friendIcon: {
    // backgroundColor: 'green',
    color: colors.grey,

  }


});
