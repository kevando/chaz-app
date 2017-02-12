import React from 'react';

import Dashboard from '../routes/Dashboard';
import InputTitle from '../routes/InputTitle';
import InputFriend from '../routes/InputFriend';
import ConfirmRecommendation from '../routes/ConfirmRecommendation';
import Debug from '../routes/Debug';
import Hello from '../routes/Hello';
// import Rec from '../routes/Rec';
// import Recr from '../routes/Recr';
// import Categories from '../routes/Categories';
// import RecInput from '../routes/RecInput';
// import RecrInput from '../routes/RecrInput';
// import Queue from '../routes/Queue';

import * as Nav from '../components/Nav';

import ExNavigator from '@exponent/react-native-navigator';

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
          <Nav.DashboardTitle title="Dashboard" navigator={navigator} />
        );
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
      renderTitle(navigator) {
        return <Nav.DashboardTitle title="Debug Settings" navigator={navigator} />
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
      renderTitle(navigator) {
        return (
          <Nav.DashboardTitle title="" navigator={navigator} />
        );
      },
      // @todo change this, user can still click button
      renderLeftButton(navigator) {
        return <Nav.Button text="" onPress={() => navigator.pop() } />
      },
    };
  },

};

export default routes;
