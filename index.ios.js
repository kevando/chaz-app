// import App from './src/app';
//
// const app = new App();


import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: You are manually calling a React.PropTypes validation'];

import App from './src/app';

// I think this has to be the xcode project name
AppRegistry.registerComponent('chaz', () => App);
