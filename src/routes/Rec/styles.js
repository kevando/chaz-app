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
    fontSize:16,
    color:'#555',
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
    paddingTop: 4,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    color:'#555'
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
    borderBottomColor:'#ccc',
    flexDirection: 'row',
  },

  grade: {
    flex: 1,
    fontSize: 34,
    padding:5,
    opacity: 0.6,
  }

});
