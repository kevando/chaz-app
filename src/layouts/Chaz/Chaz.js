import React, {Component} from 'react';
import {View,Text,Button,Animated,Easing, Keyboard } from 'react-native';
// import Routes, { RouteConfigs } from '../../config/routes';
import styles, { navigationBarStyle, titleStyle } from './styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import Dashboard from '../../routes/Dashboard';
import InputTitle from '../../routes/InputTitle';
import InputFriend from '../../routes/InputFriend';
import ConfirmRecommendation from '../../routes/ConfirmRecommendation';
import Hello from '../../routes/Hello';



class CloseButton extends Component {

  _onClose() {
    Keyboard.dismiss()
    Actions.pop()
  }
  render() {
    return (
      <Button onPress={this._onClose} title="Close" color="white" />
    )
  }
}


class Chaz extends Component {


  render() {
    // console.log(this.props)
    const { showOnboarding } = this.props

    return (

      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
        <Modal key="root" hideNavBar={true}>
          <Stack key="MainStack" initial={true}>
            <Scene key='Dashboard' component={Dashboard} title='Dashboard' hideNavBar={showOnboarding} initial={!showOnboarding} />
          </Stack>
          <Stack key="InputStack" back backTitle="Close" hideBackImage  backButtonTextStyle={{ color:'white' }}  >
            <Scene key='InputTitle' component={InputTitle} title='' hideNavBar={false} renderBackButton={() => <CloseButton />} />
            <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} backTitle="Back"/>
            <Scene key='ConfirmRecommendation'  component={ConfirmRecommendation} title='' hideNavBar={false} backTitle="Back" />
          </Stack>

        </Modal>
        </Router>


    )

  }

}



export default Chaz;
