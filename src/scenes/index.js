
import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Launch from '../nav_components/Launch';
import Register from '../nav_components/Register';
import Login from '../nav_components/Login';
import Login2 from '../nav_components/Login2';
import Login3 from '../nav_components/Login3';
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
import Error from '../nav_components/Error';
import Popup from '../nav_components/Popup'; // kev
import Home from '../nav_components/Home';
import TabView from '../nav_components/TabView';
import TabIcon from '../nav_components/TabIcon';
import EchoView from '../nav_components/EchoView';
import NavigationDrawer from '../nav_components/NavigationDrawer';
import Button from 'react-native-button';

import Recommendations from './Recommendations';
import RecommendationAdd from './RecommendationAdd';
import Recommendation from './Recommendation';
import Profile from './Profile'
import Welcome from './Welcome'


export const Scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" hideTabBar>

      <Scene key="welcome" component={Welcome} title="Welcome"  />
      <Scene key="recommendations" component={Recommendations} title="Recommendationss" type={ActionConst.REPLACE} onLeft={()=>Actions.profile()} leftTitle="Exit" />
      <Scene key="recommendationAdd" component={RecommendationAdd} title="Add Rec" hideBackImage={true} backButtonTextStyle={{color:'red'}} backTitle="Cancel" direction="vertical" />
      <Scene key="recommendationFromAdd" component={Recommendation} title="View Recy" type={ActionConst.REPLACE} />


      <Scene key="recommendation" component={Recommendation} title="View Rec" />
      <Scene key="profile" component={Profile} title="Profile" />



      <Scene key="register" component={Register} title="Register"  />

      <Scene key="register2" component={Register} title="Register2" duration={1} />
      <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE} />
      <Scene key="launch" component={Launch} title="Launch"  uid={'connecct this to redux some how'} />
      <Scene key="login" direction="vertical" >
        <Scene key="loginModal" direction="vertical" component={Login} title="Login" />
        <Scene
          key="loginModal2"
          hideNavBar
          component={Login2}
          title="Login2"
          panHandlers={null}
          duration={1}
        />
        <Scene
          key="loginModal3"
          hideNavBar
          component={Login3}
          title="Login3"
          panHandlers={null}
          duration={1}
        />
      </Scene>

    </Scene>
    <Scene key="error" component={Error} />
    <Scene key="popup" component={Popup} />
  </Scene>


);



// Does this need to be redux?
//
// function mapStateToProps(state) {
//   return {
//     rec: state.rec,
//     recr: state.recr,
//     app: state.app,
//     onboard: state.onboard
//   };
// }
//
// export default connect(mapStateToProps)(RouterContainer);

// export default Chaz;
