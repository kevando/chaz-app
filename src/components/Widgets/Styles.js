import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 3;

export default styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 30,
    borderColor:colors.grey,
    borderWidth:1,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding:10,
    borderColor:colors.grey,
    borderBottomWidth:1,
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
    backgroundColor: colors.lightGrey,
    borderTopWidth:0,
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
    paddingLeft: 5,
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

  text: {
    fontWeight: '400',
    fontSize: 15,
    color: colors.black,
  },
  bold: {
    fontWeight: '700',
    fontSize: 15,
    color: colors.black,
  },

  buttons: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 5,
  },

  notificationContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor:colors.grey,
    borderWidth:1,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  notificationTitle: {
    backgroundColor: colors.lightGrey,
    padding: 3,
  },

  needsData: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
  },
  needsDataTitle: {
    fontSize:17,
    color: colors.black,
    fontWeight: '400'
  },


});
