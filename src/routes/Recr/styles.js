import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding:0
  },

  titleContainer: {
    backgroundColor: '#fff',
    // flexDirection:'row', // so text does not wrap
    padding:15,
    marginBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },
  title: {
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    marginTop:5
  },

  scores: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderBottomWidth: 0,
    marginHorizontal: 30,

  },
  scoreRow: {
    paddingHorizontal:5,
    paddingVertical:7,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  text: {
    fontWeight: '400',
    fontSize: 16
  },
  category: {
    flex: 4,
  },
  score: {
    flex: 1,
  },


});
