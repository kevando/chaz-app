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
    '#3AE8B9', // Purple / App
    '#3AE8B9', // Blue / Rec
    '#3AE8B9', // Green / Recr
    '#FFE550', // Yellow
    '#3AE8B9', // Red
  ],

};
const hearts = [
    'green_heart',
    'blue_heart',
    'purple_heart',
    'yellow_heart',
  ];

const colors = {

  purple:       "#A717D3",
  blue:         "#3888EA",
  green:        "#3A931F",
    //yellow
  red:          "#E83A3A",

  black:        "#0F0F0F",
  darkGrey:     "#3F3F3F",
  grey:         "#BABABA",
  lightGrey:    "#E5E5E5",
  white:        "#F2F2F2",
}

var fonts = StyleSheet.create({

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

module.exports.fonts = fonts
module.exports.constants = constants;
module.exports.colors = colors;
module.exports.hearts = hearts;
// module.exports.isSortActive = isSortActive;
// module.exports.isFilterActive = isFilterActive;
