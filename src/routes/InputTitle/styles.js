import { StyleSheet } from 'react-native';
import { colors, text, width } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    // borderWidth: 4,
    // borderColor: 'green',
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    width: width,
    right: 0,
    // backgroundColor: 'blue',
    justifyContent: 'flex-start',
  },
  TOP: {
    flex: 1,
  },
  CARD: {
    // backgroundColor:'yellow',
    // border: ''
    // flex: 1,
    height: 350,
  },

  input: {
    ...text,
    flex:1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
  }

});
