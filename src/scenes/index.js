
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


const navBarStyle = {
  backgroundColor:'#ddd',
  // height:20,
  padding:0,
  borderBottomWidth: 1,
}
const navBarTitleStyle = {
  // backgroundColor:'#fff',
  color:'#444',
  borderBottomWidth: 2,
  borderBottomColor: 'red',
  fontSize:15,
}
const leftButtonStyle = {
  // backgroundColor:'#ccc',
  // height:20,
  // padding:0,
  borderBottomWidth: 0,
}
const leftButtonTextStyle ={
  fontSize:14,
}
const rightButtonStyle = {
  // backgroundColor:'#fff',
  height:20,
  padding:0,
  borderBottomWidth: 0,
}

export const Scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" direction="vertical" leftButtonTextStyle={leftButtonTextStyle} titleStyle={navBarTitleStyle} navigationBarStyle={navBarStyle} rightButtonStyle={rightButtonStyle} leftButtonStyle={leftButtonStyle} hideTabBar>

      <Scene key="welcome" component={Welcome}  hideNavBar   />

      <Scene key="profile" component={Profile}  />

      <Scene key="friends" component={Friends}  />

      <Scene key="friend" component={Friend}  />

      <Scene key="recommendations"
       navigationBarStyle={{backgroundColor:GlobalStyle.constants.colors[0]}}
       titleStyle={{fontSize:20,fontWeight:'600',color:'#fff'}}
       component={Recommendations}
       type={ActionConst.REPLACE}
       onLeft={()=>Actions.profile()}
       leftTitle="Settings"
       leftButtonTextStyle={{color:'#fff',fontSize:14}}
       onRight={()=>Actions.friends()}
       rightTitle="Friends"
       leftButtonTextStyle={{color:'#fff',fontSize:14}}
       title="chaz"
      />

      <Scene
       key="recommendationAdd"
       navigationBarStyle={{backgroundColor:GlobalStyle.constants.colors[4]}}
       titleStyle={{color:"#444"}}
       component={RecommendationInput}
       title="New Recommendation"
       hideBackImage={true}
       backButtonTextStyle={{color:'red',fontSize:13}}
       backTitle="Cancel"
       direction="vertical"
       rec={{title:'',note:''}}
      />

      <Scene
       key="recommendationEdit"
       navigationBarStyle={{backgroundColor:GlobalStyle.constants.colors[4]}}
       titleStyle={{color:"#444"}}
       component={RecommendationInput}
       title="Editing"
       hideBackImage={true}
       backButtonTextStyle={{color:'red',fontSize:13}}
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
       component={Recommendation}
       backTitle="Back"
       hideBackImage={true}
       rightButtonStyle={{width:150}}
       rightButtonTextStyle={{fontSize:13}}
      />




      <Scene key="logout" component={Logout} hideNavBar type={ActionConst.REPLACE} />



    </Scene>

    <Scene key="error" component={Error} />
    <Scene key="popup" component={Popup} />


  </Scene>


);
