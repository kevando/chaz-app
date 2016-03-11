const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    // marginTop:100 this is fucked up cause the loader
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection:'row',
    alignItems: 'stretch',
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
  liTextRight: {
    color: '#333',
    fontSize: 16,
    textAlign:'right',
    marginRight:10
  },
  recListItemRecTitle: {
    color: '#333',
    fontSize: 17,
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
    backgroundColor:'blue',
    flex:1,
    padding:6,
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
