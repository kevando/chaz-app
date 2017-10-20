import { StyleSheet, Dimensions } from 'react-native';
import { colors, text } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const MARGIN_VERTICAL = 5;
const CARD_WIDTH = (window.width - (MARGIN_HORIZONTAL*2));
const ICON_WIDTH = CARD_WIDTH / 9;
const DATE_WIDTH = CARD_WIDTH / 8;
const CARROT_WIDTH = 25;
const TEXT_WIDTH = CARD_WIDTH - ICON_WIDTH - CARROT_WIDTH - 44;

export default styles = StyleSheet.create({

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    // flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'orange',
    justifyContent: 'center', // horizontal
    alignItems: 'center', // vertical align
  },

  title: {
    ...text,
    fontSize: 28,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',

  },
  paragraph: {
    ...text,
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
    marginVertical: 10,
    textAlign: 'center',
  },



});
