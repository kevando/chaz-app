import { StyleSheet, Dimensions } from 'react-native';
import { colors, text, width } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 20;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,

    width: CARD_WIDTH,
    padding: 15,

  },

  message: {
    ...text,
    fontSize: 18,
    marginBottom: 10
  },
  settingsButtonText: {
    // marginLeft: 100,
    backgroundColor: colors.offWhite,
    height: 50,
    // width: width-50,
  }

});
