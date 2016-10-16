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
    flexDirection:'row', // so text does not wrap
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
  emoji: {
    fontSize: 40,
  },

  dateText: {
    fontSize:14,
    color:'#999',
    marginLeft:8,
    marginBottom:3
  },

  momentContainer: {
    backgroundColor: '#fff',
    marginBottom:20,
    padding:10,
    borderTopWidth:1,
    borderTopColor:'#ccc',
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },


  note: {
    paddingBottom: 18,
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'italic',
    color:'#999'
  },
  recr: {
    color: 'green',
    fontWeight: '700',
    fontSize: 15
  },

  gradeContainer: {
    backgroundColor: '#fff',
    marginBottom:20,
    padding:10,
    borderTopWidth:1,
    borderTopColor:'#ccc',
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },

});
