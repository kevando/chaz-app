import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 3;

export default styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor:colors.grey,
    borderWidth:1,
  },

  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding:9,
  },

  titleLeft: {
    flex:1,
    alignItems:'center',
  },

  titleRight: {
    flex:5,
    justifyContent:'center'
  },

  contentContainer: {
    // borderWidth:1,
    // borderColor: colors.border,

    backgroundColor: colors.lightGrey,
    borderTopWidth:0,
    // paddingHorizontal:10,
    // paddingVertical:20,
  },
  icon: {
    fontSize: 30,
    paddingBottom:5,
  },

  title: {
    fontSize:14,
    color:'#555',
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
  listItem: {
    flexDirection: 'row',
    padding: 5,
    // backgroundColor: '#ddd',
    borderColor: colors.grey,
    borderBottomWidth:1,

  },

  recrItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderColor:'#ddd',
    borderTopWidth:1,
  },
  recTitle: {
    fontSize:13,
    color:'#555',
    fontWeight:'400',
  },
  recNote: {
    fontSize:11,
    color:'#aaa',
    fontWeight:'300',
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

  bold: {
    fontWeight: '700',
    fontSize: 15,
    color: colors.black,
  },


});
