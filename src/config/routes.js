import React from 'react';
import Home from '../routes/Home';
import Details from '../routes/Details';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';

import Recs from '../routes/Recs';
import Rec from '../routes/Rec';
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
  getRecsRoute(category) { // arguement is tmp. make this its own route
    
    return {
      renderScene(navigator) {
        return <Recs navigator={navigator} category={category}/>;
      },

      showNavigationBar: true,

      getTitle() {
        return 'Recommendations';
      },
    };
  },
  getRecRoute(rec) {

    return {
      renderScene(navigator) {
        return <Rec navigator={navigator} rec={rec} />;
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
