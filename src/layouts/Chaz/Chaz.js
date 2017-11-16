import React, {Component} from 'react';
import { View, Text, LayoutAnimation, AlertIOS } from 'react-native'
import { navigationBarStyle, titleStyle, colors } from '../../config/styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, Lightbox, Overlay} from 'react-native-router-flux';
import RNShakeEvent from 'react-native-shake-event';

import Dashboard from '../../routes/Dashboard';
import RecInput from '../../routes/RecInput';
// import Walkthrough from '../../routes/Walkthrough';

import { CloseButton, BackButton, ProfileButton, DashboardRightButton } from '../../components/Nav';
import RecView from '../../routes/RecView';
import FriendView from '../../routes/FriendView';
import Splash from '../../routes/Splash';
import Register from '../../routes/Register';
import Profile from '../../routes/Profile';
import LoggedOut from '../../routes/LoggedOut';
import Loading from '../../routes/Loading';
import Invite from '../../routes/Invite';
import Reminders from '../../routes/Reminders';
import Boilerplate from '../../routes/Boilerplate';

import Hello from '../../routes/Hello';
import FirstRec from '../../routes/FirstRec';
import FirstRecConfirmation from '../../routes/FirstRecConfirmation';

import Invites from '../../routes/Invites';
import GetStarted from '../../routes/GetStarted';
import Inbox from '../../routes/Inbox';
import GodView from '../../routes/GodView';
import Debug from '../../routes/Debug';



class Chaz extends Component {
  constructor(props) {
    super(props)
    this.state = { isReady: false, layout: 'loading'}
  }

  componentWillMount() {

    // set up redux
    this.props.initializeApp()

    // Allow debug menu
    RNShakeEvent.addEventListener('shake', () => Actions.DebugLightbox );
  }

  // componentDidMount() {}
  // componentWillReceiveProps(nextProps) {}
  // componentWillUpdate() {}


  updateState = (state) => {
    this.setState(state)
  }



  render() {

    const { isAuthenticated, onboarding } = this.props
    const { isReady, layout } = this.state

    // onboarding = true
    const navBorderColor = onboarding ? colors.blueBG : colors.newBlue



    // if (!isAuthenticated || !isReady)
      // return <Loading updateState={this.updateState} />


      return (

        <Router navigationBarStyle={[navigationBarStyle,{borderTopColor: navBorderColor}]} titleStyle={titleStyle}>
          <Overlay key="overlay">
            <Modal key="root" hideNavBar={true}>

              <Stack key="OnboardingStack"  hideBackImage back initial={onboarding} hideNavBar={true} >
                <Scene key='FirstRecConfirmation' component={FirstRecConfirmation} />
                <Scene key='FirstRec' component={FirstRec} />
                <Scene key='Hello' component={Hello} initial={true} />
              </Stack>

              <Lightbox key="lightbox" initial={!onboarding}>
                <Stack key="myStack"  hideBackImage back >
                  <Scene key='Dashboard' component={Dashboard} initial={true} title='' hideNavBar={false} initial={true} renderRightButton={() => <DashboardRightButton />}/>
                  <Scene key='Helloooo' component={Hello} title='' hideNavBar={false} />
                  <Scene key='GetStarted' component={GetStarted} title='' hideNavBar={false} />

                  <Scene key='Dashboard' component={Dashboard} initial={true} title='' hideNavBar={false} initial={true} renderRightButton={() => <DashboardRightButton />}/>
                  <Scene key='RecView' component={RecView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='FriendView' component={FriendView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} navigationBarStyle={[navigationBarStyle,{backgroundColor: navBorderColor, borderTopColor: navBorderColor}]} />
                  <Scene key='Register' component={Register} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='Profile' component={Profile} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='Inbox' component={Inbox} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='Invites' component={Invites} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='LoggedOut' component={LoggedOut} title='' hideNavBar={false}  />
                  <Scene key='Reminders' component={Reminders} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='Settings' component={Boilerplate} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  <Scene key='GodView' component={GodView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                </Stack>


                <Scene key='NewRecLightbox' component={RecInput} title='' hideNavBar={true}  />
                <Scene key='FirstRec' component={RecInput} title='' hideNavBar={false}  />

                <Scene key='DebugLightbox' component={Debug} title='' hideNavBar={false}  />

                </Lightbox>
                <Scene key='NewRecLightboxModal' component={RecInput} title='' />
                <Scene key='RegisterModal' component={Register} title='' hideNavBar={false} />

                <Stack key="InviteModall"  back hideNavBar={false}>

                <Scene key='InviteScenee' component={Invite} title='' renderBackButton={() => <CloseButton />} />
                </Stack>

                <Scene key='InviteModal' hideNavBar={false} back component={Invite} title='' renderBackButton={() => <CloseButton />} />
              </Modal>
            </Overlay>
          </Router>
      )







        return (

          <Router navigationBarStyle={[navigationBarStyle,{borderTopColor: navBorderColor}]} titleStyle={titleStyle}>
            <Overlay key="overlay">
              <Modal key="root" hideNavBar={true}>
                  <Lightbox key="lightbox">
                  <Stack key="myStack"  hideBackImage back >

                    <Scene key='Hello' component={Hello} title='' hideNavBar={false} />
                    <Scene key='GetStarted' component={GetStarted} title='' hideNavBar={false} />

                    <Scene key='Dashboard' component={Dashboard} title='' hideNavBar={false} initial={true} renderRightButton={() => <DashboardRightButton />}/>
                    <Scene key='RecView' component={RecView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='FriendView' component={FriendView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} navigationBarStyle={[navigationBarStyle,{backgroundColor: navBorderColor, borderTopColor: navBorderColor}]} />
                    <Scene key='Register' component={Register} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='Profile' component={Profile} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='Inbox' component={Inbox} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='Invites' component={Invites} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='LoggedOut' component={LoggedOut} title='' hideNavBar={false}  />
                    <Scene key='Reminders' component={Reminders} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='Settings' component={Boilerplate} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                    <Scene key='GodView' component={GodView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                  </Stack>


                  <Scene key='NewRecLightbox' component={RecInput} title='' hideNavBar={true}  />
                  <Scene key='FirstRec' component={RecInput} title='' hideNavBar={false}  />

                  <Scene key='DebugLightbox' component={Debug} title='' hideNavBar={false}  />

                  </Lightbox>
                  <Scene key='NewRecLightboxModal' component={RecInput} title='' />
                  <Scene key='RegisterModal' component={Register} title='' hideNavBar={false} />

                  <Stack key="InviteModall"  back hideNavBar={false}>

                  <Scene key='InviteScenee' component={Invite} title='' renderBackButton={() => <CloseButton />} />
                  </Stack>

                  <Scene key='InviteModal' hideNavBar={false} back component={Invite} title='' renderBackButton={() => <CloseButton />} />
                </Modal>
              </Overlay>
            </Router>
        )
      // }




  }


}



export default Chaz;
