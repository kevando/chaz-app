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
    backgroundColor: colors.inputBackground,
    marginLeft: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // backgroundColor:'blue',

  },
  optionText: {
    fontSize:40,
  }

});
