import {Navigation} from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './PushedScreen';

//chaz
import RecsScreen from './RecsScreen';
import RecViewScreen from './RecViewScreen';
import ProfileScreen from './ProfileScreen';
import RecAddScreen from './RecAddScreen';
import RecrsScreen from './RecrsScreen';
import RecrViewScreen from './RecrViewScreen';
import InitScreen from './InitScreen';
import OnboardPopup from './OnboardPopup';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {

  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
  // Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);

  // Chaz
  Navigation.registerComponent('chaz.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('chaz.RecsScreen', () => RecsScreen, store, Provider);
  Navigation.registerComponent('chaz.RecViewScreen', () => RecViewScreen, store, Provider);
  Navigation.registerComponent('chaz.ProfileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent('chaz.RecAddScreen', () => RecAddScreen, store, Provider);
  Navigation.registerComponent('chaz.RecrsScreen', () => RecrsScreen, store, Provider);
  Navigation.registerComponent('chaz.RecrViewScreen', () => RecrViewScreen, store, Provider);
  Navigation.registerComponent('chaz.InitScreen', () => InitScreen, store, Provider);
  Navigation.registerComponent('chaz.OnboardPopup', () => OnboardPopup, store, Provider);
}
