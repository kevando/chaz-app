import React, {Component} from 'react';
import { View, Text, LayoutAnimation } from 'react-native'
import { navigationBarStyle, titleStyle, colors } from '../../config/styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, Lightbox, Overlay} from 'react-native-router-flux';
// import Toast from 'react-native-root-toast';

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
import Invites from '../../routes/Invites';
import GetStarted from '../../routes/GetStarted';
import Inbox from '../../routes/Inbox';

const AppToasts = () => { return (<Text>dude</Text>)}



class Chaz extends Component {
  constructor(props) {
    super(props)
    this.state = { visibleToasts: 0, isReady: false, }
  }
  componentWillMount() {
    this.props.initializeApp() // redux
  }

  componentDidMount() {
    // console.log('chaz.js mounted')
  }

  componentWillReceiveProps(nextProps) {
    this._shouldToastDisplay(nextProps)
  }

  componentWillUpdate() {
    // LayoutAnimation.linear(); // set the fade
  }

  _shouldToastDisplay = (nextProps) => {
    // const { status, error } = this.props.app
    // // if(nextProps.app.status != status)
    // //   this._renderToast(nextProps.app.status,'green')
    //
    // if(nextProps.app.error != error)
    //   this._renderToast(nextProps.app.error.message,'red')
  }

  _renderToast = (message, color) => {

    // const OFFSET = this.state.visibleToasts * 60
    // this.setState({visibleToasts: ++this.state.visibleToasts})
    //
    // let toast = Toast.show(message, {
    //     // duration: 14000,
    //     duration: 2000,//Toast.durations.SHORT,
    //     position: Toast.positions.TOP + OFFSET,
    //     backgroundColor: color,
    //     onHidden: () => {
    //         this.setState({visibleToasts: --this.state.visibleToasts})
    //     }
    // });
  }

  updateState = (state) => {
    this.setState(state)
  }



  render() {
    // console.warn('Chaz.js Rendered onboarding: ',this.props.onboarding)
    const { isAuthenticated, } = this.props
    onboarding = true
    const navBorderColor = onboarding ? colors.blueBG : colors.newBlue

    // PROD Animate screen loading
    // const { isReady } = this.state
    // if (!isReady || !isAuthenticated)
      // return <Loading updateState={this.updateState} />;

      // if(onboarding == true) {
      //   // console.warn('return onboarding')
      //   return <Onboarding />
      // } else {
      //   // console.warn('return app')
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
                  </Stack>


                  <Scene key='NewRecLightbox' component={RecInput} title='' hideNavBar={true}  />
                  <Scene key='FirstRec' component={RecInput} title='' hideNavBar={false}  />

                  </Lightbox>
                  <Scene key='NewRecLightboxModal' component={RecInput} title='' />

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
