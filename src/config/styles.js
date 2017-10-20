import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

const env = process.env.NODE_ENV;
// alert(env)

// ------------------------------
// Constants

export const width = window.width;
export const height = window.height;


// ------------------------------
// Colors


export const colors = {


  // chaz colors
  purple:       env=='development' ? "#8a69c6":'#8a69c6',
  blue:         "#3888EA",
  green:        "#3A931F",
  red:          "#E83A3A",
  yellow:       "#ffe46a",

  black:        "#1E1E1E",
  darkGrey:     "#5E5E5E",
  grey:         "#8C8C8C",
  lightGrey:    "#F2F2F2",
  offWhite:    "#E8E8E8",
  white:        "#FFF",

  cardBorder:       "#D6D6D6",
  backgroundGrey:    "#F1F1F1",


  darkPurple:   "#7B40AF",

};

export const hearts = {
  green:     'green_heart',
  blue:      'blue_heart',
  purple:    'purple_heart',
  yellow:    'yellow_heart',
}



// ------------------------------
// Global Text Defaults

export const text = {
  fontSize: 20,

  fontFamily: 'Avenir Next',
  color: colors.black,
  letterSpacing: 0.5,
  fontWeight: '400'
}
