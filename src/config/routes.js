import React from 'react';

import Home from '../routes/Home';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';
import Recs from '../routes/Recs';
import Recrs from '../routes/Recrs';
import Rec from '../routes/Rec';
import Categories from '../routes/Categories';
import RecInput from '../routes/RecInput';
import RecrInput from '../routes/RecrInput';
import Queue from '../routes/Queue';

import * as Nav from '../components/Nav';

import ExNavigator from '@exponent/react-native-navigator';

export const routes = {
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      renderTitle(navigator) {
        return (
          <Nav.HomeTitle title="chaz" navigator={navigator} />
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

  /* Recommendations */

  getRecsRoute(category) {

    return {
      renderScene(navigator) {
        return <Recs navigator={navigator} category={category}/>;
      },

      getTitle() {
        return '';
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Back" onPress={() => navigator.pop() } />
      },

    };
  },

  /* Queue */

  getQueueRoute(category) {

    return {
      renderScene(navigator) {
        return <Queue navigator={navigator} category={category}/>;
      },

      renderTitle(navigator) {
        return (
          <Nav.QueueTitle icon="tv" />
        );
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Back" onPress={() => navigator.pop() } />
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



      showNavigationBar: true,
    };
  },

  /* Rec Input */

  getRecInputRoute(rec) {
    return {
      renderScene(navigator) {
        return <RecInput navigator={navigator} rec={rec} />;
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Cancel" onPress={() => navigator.pop() } />
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

    };
  },

  /* Recr Input */

  getRecrInputRoute(rec) {
    return {
      renderScene(navigator) {
        return <RecrInput navigator={navigator} rec={rec} />;
      },

      configureScene(){
        return ExNavigator.SceneConfigs.FloatFromBottom
      },

      renderLeftButton(navigator) {
        return <Nav.Button text="Cancel" onPress={() => navigator.pop() } />
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

      // renderLeftButton(navigator) {
      //   return <NavButton text="Cancel" onPress={() => navigator.pop() } />
      // },

    };
  },
};

export default routes;
