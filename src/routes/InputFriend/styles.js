import { StyleSheet } from 'react-native';
import { colors, friend } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent:'flex-start'
  },

  input: {
    fontSize: 20,
    padding: 3,
    // backgroundColor: 'yellow',
    height:50
  },

  friendsContainer: {
    padding: 3,
    // backgroundColor: 'red',
  },

  friend: {
    ...friend,
    color: colors.darkGrey,
    paddingVertical:5,
    paddingLeft:15
  }


});
