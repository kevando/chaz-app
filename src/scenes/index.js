
import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import Launch from '../nav_components/Launch';
// import Register from '../nav_components/Register';
// import Login from '../nav_components/Login';
// import Login2 from '../nav_components/Login2';
// import Login3 from '../nav_components/Login3';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
  NavBar
} from 'react-native-router-flux';



import Button from 'react-native-button';

import Recommendations from './Recommendations';
import RecommendationAdd from './RecommendationAdd';
import Recommendation from './Recommendation';
import Profile from './Profile'
import Welcome from './Welcome'
import RecommenderAdd from './RecommenderAdd';

import Popup from './Popup';
import OnboardPopup from './OnboardPopup';


export const Scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" hideTabBar>

      <Scene key="welcome" component={Welcome} title="Welcome"  />
      <Scene key="recommendations" component={Recommendations} title="Recommendationss" type={ActionConst.REPLACE} onLeft={()=>Actions.profile()} leftTitle="Exit" />
      <Scene key="recommendationAdd" component={RecommendationAdd} title="Add Rec" hideBackImage={true} backButtonTextStyle={{color:'red'}} backTitle="Cancel" direction="vertical" />
      <Scene key="recommendationFromAdd" component={Recommendation} title="View Recy" type={ActionConst.REPLACE} />


      <Scene key="recommendation" component={Recommendation} title="View Rec" />
      <Scene key="profile" component={Profile} title="Profile" />





    </Scene>
    <Scene key="error" component={Error} />
    <Scene key="popup" component={Popup} />
    <Scene key="recommenderAdd" component={RecommenderAdd} />
    <Scene key="onboardPopup" component={OnboardPopup} />
  </Scene>


);
