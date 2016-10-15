import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({
  list: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    backgroundColor: '#eee',
    margin: 5,
    borderColor:'#bbb',
    borderWidth:1
  },
  item: {
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#ddd',
    borderColor:'#fff',
    borderBottomWidth:1,
  }

});
