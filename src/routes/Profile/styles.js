import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.blueBG,
  },
  signoutButton: {
    fontSize: 8,

    color: colors.lightGrey,
    // backgroundColor: colors.grey,
  },
  //
  headerContainer: {
    backgroundColor: colors.lightWhite,
    // margin: 10,
    // padding: 2,
    paddingVertical: 20,
  },
  friendRowItem: {
    backgroundColor: colors.lightWhite,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  friendText: {
    ...text,
    fontSize: 22,
    paddingLeft: 10,
    // paddingVertical: 25,

    color: colors.white
  },
  title: {
    ...text,
    textAlign: 'center',
    fontSize: 30,
    paddingLeft: 15,
    paddingVertical: 25,
    // height: 50,
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    color: colors.white
  },

});
