import React from 'react';
import Home from '../routes/Home';
import Details from '../routes/Details';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';

import Recommendations from '../routes/Recommendations';
import Recommendation from '../routes/Recommendation';
import Categories from '../routes/Categories';
import RecInput from '../routes/RecInput';

export const routes = {
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      getTitle() {
        return 'Home';
      },
    };
  },
  getDetailsRoute() {
    return {
      renderScene(navigator) {
        return <Details navigator={navigator} />;
      },

      getTitle() {
        return 'Details';
      },
    };
  },
  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
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
  getRecommendationsRoute() {
    return {
      renderScene(navigator) {
        return <Recommendations navigator={navigator} />;
      },

      showNavigationBar: true,
    };
  },
  getRecommendationRoute(rec) {

    return {
      renderScene(navigator) {
        return <Recommendation navigator={navigator} rec={rec} />;
      },

      getTitle(){
        return rec.title
      },

      showNavigationBar: true,
    };
  },
  getRecInputRoute() {
    return {
      renderScene(navigator) {
        return <RecInput navigator={navigator} />;
      },

      showNavigationBar: true,
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
    };
  },
};

export default routes;
