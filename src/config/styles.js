import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

// ------------------------------
// Constants

export const width = window.width;
export const height = window.height;


export const colors = {

  // chaz colors
  purple:       "#8a69c6",
  blue:         "#3888EA",
  green:        "#3A931F",
  red:          "#E83A3A",
  yellow:       "#ffe46a",

  black:        "#1E1E1E",
  darkGrey:     "#5E5E5E",
  grey:         "#C2C2C2",
  lightGrey:    "#F0F0F0",
  offWhite:    "#E8E8E8",
  white:        "#FFF",
};

export const hearts = {
  green:     'green_heart',
  blue:      'blue_heart',
  purple:    'purple_heart',
  yellow:    'yellow_heart',
}


// ------------------------------
// Friend Text

export const friend = {
  fontSize: 20,
  // fontFamily: 'Baskerville', // default for now
  color: colors.black,
  letterSpacing: 1.1,
  fontWeight: '400'
}

// ------------------------------
// Text

export const text = {
  fontSize: 20,
  fontFamily: 'Helvetica', // default for now
  color: colors.black,
  letterSpacing: 0.5,
  fontWeight: '400'
}


// ------------------------------
// Title Defaults

export const Title = {
  fontSize: 20,
  // fontFamily: 'Baskerville', // default for now
  color: colors.black,
  letterSpacing: 1.1,
  fontWeight: '500'
}
