import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';



export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },

  tagline: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '300',
    textAlign: 'left',
    paddingTop:20,
    lineHeight: 30,
    marginBottom:50,
    paddingHorizontal:20
  },

});
