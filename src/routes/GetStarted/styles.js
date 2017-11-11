import { StyleSheet, Dimensions} from 'react-native';
import { colors, text, MARGIN_LEFT, width } from '../../config/styles';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    // paddingLeft: MARGIN_LEFT,
    backgroundColor: colors.blueBG,
    // justifyContent: 'flex-start'
  },



  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    // width: 200,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  }

});
