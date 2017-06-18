import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';

import Dashboard from '../routes/Dashboard';
import InputTitle from '../routes/InputTitle';
import InputFriend from '../routes/InputFriend';
import ConfirmRecommendation from '../routes/ConfirmRecommendation';
import Debug from '../routes/Debug';
import Hello from '../routes/Hello';
import * as Nav from '../components/Nav';

export const RouteConfigs = {
  Hello: { screen: Hello },
  InputTitle: { screen: InputTitle },
  InputFriend: { screen: InputFriend },
  ConfirmRecommendation: { screen: ConfirmRecommendation },
  Dashboard: { screen: Dashboard },
};

export const routes = {

  // -----------------------------------------
  //    DASHBOARD
  // -----------------------------------------

  getDashboardRoute() {
    return {
      renderScene(navigator) {
        return <Dashboard navigator={navigator} />;
      },

      renderTitle(navigator) {
        return (
          <Nav.DashboardNav navigator={navigator} />
        );
      },

      renderLeftButton(navigator) {
        return <Nav.SettingsButton navigator={navigator} />
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

    };
  },

  // -----------------------------------------
  //    NEW RECOMMENDATION
  // -----------------------------------------

  getNewRecommendationRoute() {
    return {
      renderScene(navigator) {
        return <InputTitle navigator={navigator} />;
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Close" onPress={() => navigator.pop() } />
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

    };
  },

  // -----------------------------------------
  //    ASSIGN FRIEND TO RECOMMENDATION
  // -----------------------------------------

  getInputFriendRoute() {
    return {
      renderScene(navigator) {
        return <InputFriend navigator={navigator} />;
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Back" onPress={() => navigator.pop() } />
      },

      // configureScene(){
      //   return ExNavigator.SceneConfigs.FloatFromBottom
      // },

    };
  },

  // -----------------------------------------
  //    CONFIRM NEW RECOMMENDATION
  // -----------------------------------------

  getConfirmRecommendationRoute() {
    return {
      renderScene(navigator) {
        return <ConfirmRecommendation navigator={navigator} />;
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Back" onPress={() => navigator.pop() } />
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

    };
  },

  // -----------------------------------------
  //    DEBUG SETTINGS
  // -----------------------------------------

  getDebugRoute() {
    return {
      renderScene(navigator) {
        return <Debug navigator={navigator} />;
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },
      getTitle() {
        return "Settings"
      }
    };
  },

  // -----------------------------------------
  //    HELLO
  // -----------------------------------------

  getHelloRoute() {
    return {
      renderScene(navigator) {
        return <Hello navigator={navigator} />;
      },

      // @todo change this, user can still click button
      renderLeftButton(navigator) {
        return <Nav.Button text="" onPress={() => navigator.pop() } />
      },
    };
  },

};

export default routes;
