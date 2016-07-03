const React = require('react-native')
const {StyleSheet} = React
const constants = {
  hearts: [
    'green_heart',
    'blue_heart',
    'purple_heart',
    'yellow_heart',
  ],
  colors: [
    '#78B159',
    '#5DADEC',
    '#AA8ED6',
    '#FFE550',
    '#3F3F3F',
  ],

};

var styles = StyleSheet.create({
  listContainer: {
    // backgroundColor: '#f2f2f2',
    backgroundColor: 'red',
    flex: 1,
    paddingTop:0,
    justifyContent: 'flex-start'
    // marginTop:100 this is fucked up cause the loader
  },
  listview: {
    backgroundColor:'#eee',
    flex: 1,
    marginTop:0,
    paddingTop:0,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection:'row',
  },
  liContainer: {
    flex: 5,
  },
  liLeft: {
    flex:2
  },
  liRight: {
    flex:1,
  },
  filterContainer: {
    backgroundColor:constants.colors[4],
    marginTop:0,
    alignItems: 'center',
    marginTop:65, // not sure why I have to add this, think it has something to do with loader
  },
  filterButton: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:2,
    paddingTop:2,
    borderColor:'#fff',
    borderWidth:1,
    color:'#fff'
  },
  filterRow: {
    flex:1,
    flexDirection:'row',
    margin:5,

  },
  liTextRight: {
    color: '#333',
    fontSize: 13,
    textAlign:'right',
    marginRight:10
  },
  recListItemRecTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight:'500'
  },
  recListItemRecGradeMissing: {
    color: '#aaa',
    fontSize: 12,
    fontWeight:'300',

  },

  recListItemRecHumanMissing: {
    color: '#fff',
    fontSize: 12,
    fontWeight:'300',
    textAlign: 'right',
    color:'blue',
    flex:1,
    padding:2,
    textAlign:'center',
    backgroundColor: 'red'
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:13,
    paddingBottom: 13
  },
  actionTouch: {
    backgroundColor: constants.colors[1],
    padding:2
  },
  action: {

    borderColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  // chaz
  containerTmp: {
    // backgroundColor: 'red',
    paddingTop:150
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list:{
    flex:1
  },
  line: {
    marginTop:150,
    flex:1
  },
  navigatorContainer:{
    flex:1,
  },
  loadingView: {
    backgroundColor: 'red',


    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  loadingText: {
    // flex:1,
    width: 100,
    textAlign: 'center',
    backgroundColor:'blue',

  }
})

function isSortActive(orderBy,recSort){
  if(orderBy == recSort)
    return {backgroundColor:'#fff',color:constants.color4}
}
function isFilterActive(filter,recFilter){
  if(filter == recFilter)
    return {backgroundColor:'#fff',color:constants.color4}
}

module.exports = styles
module.exports.constants = constants;
module.exports.isSortActive = isSortActive;
module.exports.isFilterActive = isFilterActive;
