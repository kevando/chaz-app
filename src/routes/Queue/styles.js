import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

// const window = Dimensions.get('window');
// const MARGIN_HORIZONTAL = 10;
// const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // title: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   padding: 5
  // },

  sortContainer: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom:10,

  },
  sort: {
    flex:1,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  activeSort: {
    backgroundColor: '#fff',
    color:'#000',
  }
});
