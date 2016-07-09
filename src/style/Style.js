const React = require('react-native');
const {StyleSheet} = React

const constants = {
  hearts: [
    'green_heart',
    'blue_heart',
    'purple_heart',
    'yellow_heart',
  ],
  colors: [
    '#AA8ED6', // Purple / App
    '#5DADEC', // Blue / Rec
    '#78B159', // Green / Recr
    '#ccc',
    '#ccc',
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

})


// function isFilterActive(filter,recFilter){
//   if(filter == recFilter)
//     return {backgroundColor:'#fff',color:constants.color4}
// }

module.exports = styles
module.exports.constants = constants;
// module.exports.isSortActive = isSortActive;
// module.exports.isFilterActive = isFilterActive;
