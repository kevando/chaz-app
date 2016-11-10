import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#eee',
    margin: 5,
    borderColor:'#bbb',
    borderWidth:1
  },
  item: {
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#fff',
    borderColor:'#ccc',
    borderBottomWidth:1,
  },
  icon: {
    fontSize:30,
    paddingBottom:5,

  },
  recrName: {
    fontSize:16
  },
  recrScore: {
    fontSize:13,
    color:'#999'
  }

});
