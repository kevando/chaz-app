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
    '#D066E8', // Purple / App
    '#5DADEC', // Blue / Rec
    '#78B159', // Green / Recr
    '#FFE550', // Yellow
    '#EFEFEF', // Grey
  ],

};

var styles = StyleSheet.create({

  // GLOBAL FONT SETTINGS
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 13,
  },
  // label and value used in rows
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    fontSize: 13,
    fontWeight: '300',
    textAlign:'right'
  }

})


// function isFilterActive(filter,recFilter){
//   if(filter == recFilter)
//     return {backgroundColor:'#fff',color:constants.color4}
// }

module.exports.styles = styles
module.exports.constants = constants;
// module.exports.isSortActive = isSortActive;
// module.exports.isFilterActive = isFilterActive;
