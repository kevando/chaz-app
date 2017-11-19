import { StyleSheet, Dimensions} from 'react-native';
import { colors, text } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.newBlue,
    paddingTop: 40,
  },
  headerContainer: {
    backgroundColor: colors.blueBG,
    // margin: 10,
    // padding: 2,
    paddingVertical: 20,
  },
  friendRowItem: {
    backgroundColor: colors.white,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 6,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  friendText: {
    ...text,
    fontSize: 22,
    paddingLeft: 10,
    // paddingVertical: 25,

    color: colors.darkGrey
  },
  title: {
    ...text,
    textAlign: 'center',
    fontSize: 30,
    // paddingLeft: 15,
    paddingVertical: 10,
    color: colors.white
  },
  subTitle: {
    ...text,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
    // paddingLeft: 15,
    paddingVertical: 10,
    color: colors.white
  }

});
