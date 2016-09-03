
import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
import RecommendationInput from './RecommendationInput';
import Recommendation from './Recommendation';
import Profile from './Profile'
import Welcome from './Welcome'
import Popup from './Popup';
import Logout from './Logout';
import Friends from './Friends';
import Friend from './Friend';

import * as GlobalStyle from '../style/Global';
import {colors} from '../style/Global';


const NavigationStyle = {
  navigationBarStyle: {backgroundColor:'#fff',borderBottomWidth:2,borderBottomColor:'red'},
  titleStyle: {},
  leftButtonStyle:  {top:22},
  rightButtonStyle: {top:22},

  leftButtonTextStyle:  {color:colors.darkGrey,fontSize:16,fontWeight:'400'},
  rightButtonTextStyle: {color:colors.darkGrey,fontSize:16,fontWeight:'400'},

  backButtonTextStyle: {}
}

export const Scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" direction="vertical" {...NavigationStyle} hideTabBar>

      <Scene key="welcome" component={Welcome}  hideNavBar   />

      <Scene
        key="profile"
        component={Profile}
        title="Profile"
        navigationBarStyle={[NavigationStyle.navigationBarStyle,{backgroundColor:colors.lightGrey,borderBottomWidth:0}]}
      />

      <Scene key="friends" component={Friends}  />

      <Scene key="friend" component={Friend}  />

      <Scene key="recommendations"
       navigationBarStyle={[NavigationStyle.navigationBarStyle,{backgroundColor:colors.purple,borderBottomColor:colors.purple}]}
       component={Recommendations}
       type={ActionConst.REPLACE}
       onLeft={()=>Actions.profile()}
       leftTitle="Profile"
       leftButtonTextStyle={[NavigationStyle.leftButtonTextStyle,{color:'#fff'}]}
       onRight={()=>Actions.friends()}
       rightTitle="Friends"
       rightButtonTextStyle={[NavigationStyle.rightButtonTextStyle,{color:colors.purple}]}
       title=""
      />

      <Scene
       key="recommendationAdd"
       navigationBarStyle={[NavigationStyle.navigationBarStyle,{backgroundColor:colors.gery,borderBottomColor:colors.blue}]}
       titleStyle={{color:"#444"}}
       component={RecommendationInput}
       title=""
       hideBackImage={true}
       backButtonTextStyle={{color:colors.red}}
       backTitle="Cancel"
       direction="vertical"
       rec={{title:'',note:''}}
      />

      <Scene
       key="recommendationEdit"
       navigationBarStyle={[NavigationStyle.navigationBarStyle,{backgroundColor:colors.gery,borderBottomColor:colors.blue}]}
       titleStyle={[NavigationStyle.titleStyle,{color:colors.grey}]}
       component={RecommendationInput}
       title="Editing"
       hideBackImage={true}
       backButtonTextStyle={{color:colors.red}}
       backTitle="Cancel"
       direction="vertical"
      />

      <Scene
       key="recommendationFromAdd"
       component={Recommendation}
       title=""
       type={ActionConst.REPLACE}
       hideBackImage={true}
       backTitle="Back"
      />


      <Scene
       key="recommendation"
       navigationBarStyle={[NavigationStyle.navigationBarStyle,{backgroundColor:colors.blue,borderBottomColor:colors.blue}]}
       component={Recommendation}
       backTitle="Back"
       hideBackImage={true}
       backButtonTextStyle={[NavigationStyle.backButtonTextStyle,{color:'#fff'}]}

      />




      <Scene key="logout" component={Logout} hideNavBar type={ActionConst.REPLACE} />



    </Scene>

    <Scene key="error" component={Error} />
    <Scene key="popup" component={Popup} />


  </Scene>


);
