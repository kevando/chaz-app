import {Navigation} from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './PushedScreen';

//chaz
import RecsScreen from './RecsScreen';
import RecViewScreen from './RecViewScreen';
import SettingsScreen from './SettingsScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);

  // Chaz
  Navigation.registerComponent('chaz.RecsScreen', () => RecsScreen, store, Provider);
  Navigation.registerComponent('chaz.RecViewScreen', () => RecViewScreen, store, Provider);
  Navigation.registerComponent('chaz.SettingsScreen', () => SettingsScreen, store, Provider);
}
