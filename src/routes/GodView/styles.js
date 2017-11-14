import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT, } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueBG,
    paddingHorizontal: MARGIN_LEFT,
  },
  row: {
    // flex: 1,
    backgroundColor: colors.newBlue,
    flexDirection: 'column',
    padding: 10,
    margin: 5,
  },
  keyText: {
    ...text,
    color: 'white',
    fontSize: 18,
    fontWeight: '800'
  },
  fieldText: {
    ...text,
    color: 'white',
    fontSize: 15,
    fontWeight: '300'
  },

  text: {
    ...text,
    marginLeft: 20,
    marginBottom: 5,
    color: 'white',
    fontSize: 15,
    // flex: 1,
    flexDirection: 'row'
  }

});
