const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
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

    // backgroundColor: 'red',
    flex:2
  },
  liRight: {


    // flexDirection: 'row',
    flex:1,

  },
  filterContainer: {
    backgroundColor:'#ddd',
    marginTop:0,
    alignItems: 'center'
  },
  filterButton: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:2,
    paddingTop:2,
    borderColor:'#fff',
    borderWidth:1
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
    textAlign:'center'
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
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
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
  }
})

module.exports = styles
module.exports.constants = constants;
