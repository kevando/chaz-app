import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 3;

export default styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    borderWidth:1,
    borderColor: colors.border,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: '#fff',
    padding:5,
    paddingLeft:9,
  },
  contentContainer: {
    borderWidth:1,
    borderColor: colors.border,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    backgroundColor: colors.lightGrey,
    borderTopWidth:0,
    // paddingHorizontal:10,
    // paddingVertical:20,
  },
  title: {
    fontSize:15,
    fontWeight:'500',
  },

  widgetButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  recrContainer: {
    borderWidth: 0,
    borderColor: '#555',
    flex: 1,
    flexDirection:'row',

  },
  recrItem: {
    borderWidth: 0,
    borderColor: '#555',
    width: cardSize,
    alignItems:'center',

  },

  item: {
  flexDirection: 'row',

  padding: 10,
  backgroundColor: '#ddd',
  borderColor:'#fff',
  borderBottomWidth:1,

},
itemText: {
  backgroundColor: colors.buttonBackground,
  color: colors.buttonText,
  width: cardSize,
  height: cardSize,
  paddingTop: cardSize / 2.3,
  fontSize: 16,
  fontWeight:'500',
  textAlign: 'center',
  alignItems: 'center',
},


});
