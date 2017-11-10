import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colors.blueBG,
    paddingHorizontal: MARGIN_LEFT,
  },


  text: {
    color: 'white',
  },
  wrapper: {
    paddingHorizontal: 0,
    flex:1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 30,
    padding: 5,
  },

});
