import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding:10
  },
  title: {
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  note: {
    paddingBottom: 18,
    fontSize: 15,
    fontWeight: '500',
  },
  recr: {
    color: 'green',
    fontWeight: '700',
    fontSize: 15
  }
});
