import React, {Component} from 'react';
import styles, { navigationBarStyle, titleStyle } from './styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, } from 'react-native-router-flux';
// import firebase from 'react-native-firebase';

import Dashboard from '../../routes/Dashboard';
import InputTitle from '../../routes/InputTitle';
import InputFriend from '../../routes/InputFriend';
import ConfirmRecommendation from '../../routes/ConfirmRecommendation';
import { CloseButton } from '../../components/Nav';
import RecView from '../../routes/RecView';




class Chaz extends Component {

  componentWillMount() {
    this.props.initializeApp() // redux
  }

  render() {
    const { showOnboarding, isAuthenticated } = this.props

    if (!isAuthenticated)
      return null;

    return (

      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
        <Modal key="root" hideNavBar={true}>
          <Stack key="MainStack" initial={true}>
            <Scene key='Dashboard' component={Dashboard} title='Dashboard' hideNavBar={showOnboarding} initial={!showOnboarding} />
            <Scene key='RecView' component={RecView} title='' hideNavBar={false} hideBackImage backTitle="Back"  backButtonTextStyle={{ color:'white' }} />
          </Stack>
          <Stack key="InputStack" back backTitle="Close" hideBackImage  backButtonTextStyle={{ color:'white' }}  >
            <Scene key='InputTitle' component={InputTitle} title='' hideNavBar={false} renderBackButton={() => <CloseButton />} />
            <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} backTitle="Back"/>
            <Scene key='ConfirmRecommendation'  component={ConfirmRecommendation} title='' hideNavBar={false} backTitle="Back" />
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
