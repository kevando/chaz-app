import React from 'react';

import Dashboard from '../routes/Dashboard';
import InputTitle from '../routes/InputTitle';
import InputFriend from '../routes/InputFriend';
// import Profile from '../routes/Profile';
// import SignIn from '../routes/SignIn';
// import Recs from '../routes/Recs';
// import Recrs from '../routes/Recrs';
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
  // DASHBOARD
  // -----------------------------------------

  getDashboardRoute() {
    return {
      renderScene(navigator) {
        return <Dashboard navigator={navigator} />;
      },

      // renderTitle(navigator) {
      //   return (
      //     <Nav.HomeTitle title="chaz v1.0" navigator={navigator} />
      //   );
      // },
      getTitle() {
        return 'Dashboard';
      }
    };
  },

  // -----------------------------------------
  // NEW RECOMMENDATION
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
  // ASSIGN FRIEND TO RECOMMENDATION
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
  // getRecrsRoute() {
  //
  //   return {
  //     renderScene(navigator) {
  //       return <Recrs navigator={navigator} />;
  //     },
  //
  //     getTitle() {
  //       return 'Friends';
  //     },
  //   };
  // },
  // getProfileRoute() {
  //   return {
  //     renderScene(navigator) {
  //       return <Profile navigator={navigator} />;
  //     },
  //
  //     configureScene(){
  //       return ExNavigator.SceneConfigs.FloatFromBottom
  //     },
  //   };
  // },
  // getSignInRoute() {
  //   return {
  //     renderScene(navigator) {
  //       return <SignIn navigator={navigator} />;
  //     },
  //
  //     showNavigationBar: false,
  //   };
  // },
  //
  // /* Recommendations */
  //
  // getRecsRoute(category) {
  //
  //   return {
  //     renderScene(navigator) {
  //       return <Recs navigator={navigator} category={category}/>;
  //     },
  //
  //     getTitle() {
  //       return '';
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Back" onPress={() => navigator.pop() } />
  //     },
  //
  //   };
  // },
  //
  // /* Queue */
  //
  // getQueueRoute(category) {
  //
  //   return {
  //     renderScene(navigator) {
  //       return <Queue navigator={navigator} category={category}/>;
  //     },
  //
  //     renderTitle(navigator) {
  //       return (
  //         <Nav.QueueTitle title={category} />
  //       );
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Back" onPress={() => navigator.pop() } />
  //     },
  //
  //   };
  // },
  //
  // /* Recommendation */
  //
  // getRecRoute(rec) {
  //
  //   let editRoute = this.getRecInputRoute(rec);
  //
  //   return {
  //
  //     renderScene(navigator) {
  //       return <Rec navigator={navigator} rec={rec} />;
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Back" onPress={() => navigator.pop() } />
  //     },
  //
  //     renderRightButton(navigator) {
  //       return <Nav.Button text="Edit" onPress={() => navigator.push(editRoute) } />
  //     },
  //
  //   };
  // },
  //

  //
  // /* Rec Input */
  //
  // getRecInputRoute(rec) {
  //   return {
  //     renderScene(navigator) {
  //       return <RecInput navigator={navigator} rec={rec} />;
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Cancel" onPress={() => navigator.pop() } />
  //     },
  //
  //     configureScene(){
  //       return ExNavigator.SceneConfigs.FloatFromBottom
  //     },
  //
  //   };
  // },
  //
  // /* Edit Category */
  //
  // getEditCategoryRoute(rec) {
  //   return {
  //     renderScene(navigator) {
  //       return <RecInput navigator={navigator} rec={rec} editCategory={true} />;
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Cancel" onPress={() => navigator.pop() } />
  //     },
  //
  //     configureScene(){
  //       return ExNavigator.SceneConfigs.FloatFromBottom
  //     },
  //
  //   };
  // },
  //
  // /* Recr Input */
  //
  // getRecrInputRoute(rec) {
  //   return {
  //     renderScene(navigator) {
  //       return <RecrInput navigator={navigator} rec={rec} />;
  //     },
  //
  //     configureScene(){
  //       return ExNavigator.SceneConfigs.FloatFromBottom
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Cancel" onPress={() => navigator.pop() } />
  //     },
  //
  //   };
  // },
  //
  // /* Recommender View */
  //
  // getRecrRoute(recr) {
  //
  //   let editRoute = this.getRecrInputRoute(recr);
  //
  //   return {
  //
  //     renderScene(navigator) {
  //       return <Recr navigator={navigator} recr={recr} />;
  //     },
  //
  //     renderLeftButton(navigator) {
  //       return <Nav.Button text="Back" onPress={() => navigator.pop() } />
  //     },
  //
  //     // renderRightButton(navigator) {
  //     //   return <Nav.Button text="Edit" onPress={() => navigator.push(editRoute) } />
  //     // },
  //
  //   };
  // },
  // getCategoriesRoute() {
  //   return {
  //     renderScene(navigator) {
  //       return <Categories navigator={navigator} />;
  //     },
  //     getTitle() {
  //       return 'Categories';
  //     },
  //
  //     // renderLeftButton(navigator) {
  //     //   return <NavButton text="Cancel" onPress={() => navigator.pop() } />
  //     // },
  //
  //   };
  // },
};

export default routes;
