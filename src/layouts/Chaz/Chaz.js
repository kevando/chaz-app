import React, {Component} from 'react';
import styles, { navigationBarStyle, titleStyle } from './styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, } from 'react-native-router-flux';
// import firebase from 'react-native-firebase';

import Dashboard from '../../routes/Dashboard';
import InputTitle from '../../routes/InputTitle';
import InputFriend from '../../routes/InputFriend';
import ConfirmRecommendation from '../../routes/ConfirmRecommendation';
import { CloseButton, BackButton } from '../../components/Nav';
import RecView from '../../routes/RecView';
import Splash from '../../routes/Splash';




class Chaz extends Component {

  componentWillMount() {
    this.props.initializeApp() // redux
  }

  render_tmp() {
    return (
      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
        <Modal key="root" hideNavBar={false}>
        <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} backTitle="Back"/>
        </Modal>
        </Router>
    )
  }
  render() {
    console.log('render chaz.js')
    const { showOnboarding, isAuthenticated } = this.props

    // return <Splash />

    if (!isAuthenticated)
      return null;

    return (

      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
        <Modal key="root" hideNavBar={true}>
          <Stack key="MainStack" initial={true} hideBackImage back>
            <Scene key='Dashboard' component={Dashboard} title='' hideNavBar={showOnboarding} initial={!showOnboarding} />
            <Scene key='RecView' component={RecView} title='' hideNavBar={false} renderBackButton={() => <BackButton nav={true} />} />
          </Stack>
          <Stack key="InputStack" back backTitle="Close" hideBackImage  backButtonTextStyle={{ color:'white' }}  >
            <Scene key='InputTitle' component={InputTitle} title='' hideNavBar={false} renderBackButton={() => <CloseButton />} />
            <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} renderBackButton={() => <BackButton />}/>
            <Scene key='ConfirmRecommendation'  component={ConfirmRecommendation} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
          </Stack>

          <Stack key="EditTitle"  >
            <Scene key='EditTitleScene' back component={InputTitle} title='Editing' hideNavBar={false} renderBackButton={() => <CloseButton />} />
          </Stack>

        </Modal>
        </Router>
    )
  }
}



export default Chaz;
