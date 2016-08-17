
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

import RecList from './Rec/List';
import RecAdd from './Rec/Add';
import RecView from './Rec/View';
import Profile from './Profile/Profile'

const Right = () => (
  <Text
    style={{
      width: 80,
      height: 37,
      position: 'absolute',
      bottom: 4,
      right: 2,
      padding: 8,
    }}
  >Right</Text>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


// let currentSwitchPage = 'text1';

// const SwitcherPage = (props) => (
//   <View>
//     <Text style={{ marginTop: 100, textAlign: 'center' }}>current page: {props.text}</Text>
//     <Button
//       onPress={() => {
//         currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
//         Actions.refresh({ key: 'switcher' });
//       }}
//     >
//       Switch!
//     </Button>
//     <Button
//       onPress={() => {
//         Actions.launch({ type: ActionConst.RESET });
//       }}
//     >
//       Exit
//     </Button>
//   </View>
// );

export const Scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" hideTabBar>

      <Scene key="recList" component={RecList} title="Recs Screen"  />
      <Scene key="recAdd" component={RecAdd} title="Add Rec" direction="vertical" />
      <Scene key="recView" component={RecView} title="View Rec" />
      <Scene key="profile" component={Profile} title="Profile" />



      <Scene key="register" component={Register} title="Register" />

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
