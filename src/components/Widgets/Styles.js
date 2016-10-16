import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 2;

export default styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: '#eee',
    marginVertical: 10,
    marginHorizontal: 10,

  },
  titleContainer: {
    borderWidth:1,
    borderColor:'#ccc',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: '#fff',
    padding:5,
    paddingLeft:9,
  },
  contentContainer: {

    borderWidth:1,
    borderColor:'#ccc',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    backgroundColor: '#ddd',
    borderTopWidth:0,
    padding:10,
  },
  title: {
    fontSize:13,
    fontWeight:'300',
  },



  list: {
    // flexDirection: 'row',
    // // flexWrap: 'wrap',
    // justifyContent: 'flex-start',
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
    fontWeight: '500',
    textAlign: 'center',
    alignItems: 'center',
  },

  recrContainer: {
    borderWidth: 2,
    borderColor: '#555',
    flex: 1,
    flexDirection:'row',

  },
  recrItem: {
    borderWidth: 2,
    borderColor: '#555',
    flex: 3,

  },

});
