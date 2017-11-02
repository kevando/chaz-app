import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

const env = process.env.NODE_ENV;
// alert(env)

// ------------------------------
// Constants

export const width = window.width;
export const height = window.height;

export const MARGIN_LEFT = 20

// ------------------------------
// Colors


export const colors = {


  // chaz colors
  purple:       env=='development' ? "#8a69c6":'#8a69c6',
  blue:         "#3888EA",
  // green:        "#51D429",
  green:        "#1DDB90",
  red:          "#E83A3A",
  yellow:       "#FFC64F",
  orange:       "#FF8801",

  black:        "#1E1E1E",
  darkGrey:     "#5E5E5E",
  grey:         "#8C8C8C",
  lightGrey:    "#F2F2F2",
  offWhite:    "#E8E8E8",
  white:        "#FFF",

  // cardBorder:       "#D6D6D6",
  backgroundGrey:    "#F1F1F1",

  darkPurple:   "#7B40AF",

  // attempting new card UI
  // cardHeader:    'rgba(138,105,198,0.6)',
  // cardHeader: '#285A99',
  cardHeader: '#285A99',
  cardBorder:    '#94A2B4',

  yellowOld:       "#ffe46a",

  blueBG: '#5C7FFC',
  newBlue: '#3557E6',
  pink: '#FF0AB1',


  borderColor: '#CECECE',
  dividerColor: '#CECECE',

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
  fontSize: 30,

  fontFamily: 'System',
  color: colors.black,
  letterSpacing: 0.5,
  fontWeight: '500'
}

// ------------------------------
// Navigation

export const navigationBarStyle = {
  backgroundColor: colors.blueBG,
  borderBottomWidth: 0,
  borderTopWidth: 22,
  borderTopColor: colors.newBlue,
}

export const titleStyle = {
  color: 'white'
}
