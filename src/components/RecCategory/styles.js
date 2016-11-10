import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
  optionsContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  option: {

    borderRadius: 5,
    backgroundColor: colors.lightGrey,
    marginLeft: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: colors.grey,
    borderWidth: 1,

  },
  icon: {
    fontSize:40,
    textAlign: 'center',
  },
  optionText: {
    fontSize:12,
    textAlign: 'center',
    marginTop: 5,
  },

});
