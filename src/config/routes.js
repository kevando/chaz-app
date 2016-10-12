import React from 'react';
import NavBar from '../components/NavBar';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';

import Recs from '../routes/Recs';
import Recrs from '../routes/Recrs';
import Rec from '../routes/Rec';
import Categories from '../routes/Categories';
import RecInput from '../routes/RecInput';
import RecrInput from '../routes/RecrInput';

import ExNavigator from '@exponent/react-native-navigator';

export const routes = {
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      // probly a better way to do this
      renderTitle(navigator) {
        return (
          <NavBar title="chaz" navigator={navigator} />
        );
      },
    };
  },
  getRecrsRoute() {

    return {
      renderScene(navigator) {
        return <Recrs navigator={navigator} />;
      },

      getTitle() {
        return 'Friends';
      },
    };
  },
  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },
    };
  },
  getSignInRoute() {
    return {
      renderScene(navigator) {
        return <SignIn navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
  getRecsRoute(category) { // arguement is tmp. make this its own route

    return {
      renderScene(navigator) {
        return <Recs navigator={navigator} category={category}/>;
      },

      getTitle() {
        return 'Recommendations';
      },

      getBackButtonTitle() {
        return 'Back';
      },
    };
  },
  getRecRoute(rec) {

    return {
      renderScene(navigator) {
        return <Rec navigator={navigator} rec={rec} />;
      },

      getTitle(){
        return rec.category
      },

      getBackButtonTitle() {
        return 'Back';
      },


      showNavigationBar: true,
    };
  },
  getRecInputRoute(rec) {
    return {
      renderScene(navigator) {
        return <RecInput navigator={navigator} rec={rec} />;
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

    };
  },
  getRecrInputRoute(rec) {
    return {
      renderScene(navigator) {
        return <RecrInput navigator={navigator} rec={rec} />;
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

      getBackButtonTitle() {
        return 'Back';
      },

    };
  },
  getCategoriesRoute() {
    return {
      renderScene(navigator) {
        return <Categories navigator={navigator} />;
      },
      getTitle() {
        return 'Categories';
      },

      showNavigationBar: true,

      configureScene() {
        console.log(this);
        // return SceneConfigs.PushFromRight;

      },
    };
  },
};

export default routes;
