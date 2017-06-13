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
    padding: 3,
    height:50
  },

  friendsContainer: {
    padding: 3,
  },

  friend: {
    ...text,
    color: colors.darkGrey,
    paddingVertical:5,
    paddingLeft:15
  }


});
