import React, {Component} from 'react';
import { View, Text, LayoutAnimation } from 'react-native'
import { navigationBarStyle, titleStyle, colors } from '../../config/styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, Lightbox, Overlay} from 'react-native-router-flux';
// import Toast from 'react-native-root-toast';

import Dashboard from '../../routes/Dashboard';
import RecInput from '../../routes/RecInput';
// import Walkthrough from '../../routes/Walkthrough';
import InputFriend from '../../routes/InputFriend';
import ConfirmRecommendation from '../../routes/ConfirmRecommendation';
import { CloseButton, BackButton, ProfileButton, DashboardRightButton } from '../../components/Nav';
import RecView from '../../routes/RecView';
import FriendView from '../../routes/FriendView';
import Splash from '../../routes/Splash';
import Register from '../../routes/Register';
import Profile from '../../routes/Profile';
import LoggedOut from '../../routes/LoggedOut';
import Loading from '../../routes/Loading';

const AppToasts = () => { return (<Text>dude</Text>)}



class Chaz extends Component {
  constructor(props) {
    super(props)
    this.state = { visibleToasts: 0, isReady: false, }
  }
  componentWillMount() {
    this.props.initializeApp() // redux
  }

  componentWillReceiveProps(nextProps) {
    this._shouldToastDisplay(nextProps)
  }

  componentWillUpdate() {
    // LayoutAnimation.linear(); // set the fade
  }

  _shouldToastDisplay = (nextProps) => {
    const { status, error } = this.props.app
    // if(nextProps.app.status != status)
    //   this._renderToast(nextProps.app.status,'green')

    if(nextProps.app.error != error)
      this._renderToast(nextProps.app.error.message,'red')
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
    // console.log('Chaz.js Rendered',this.props.user)
    const { showOnboarding, isAuthenticated, myRecsCount, user } = this.props
    const { isReady } = this.state

    const navBorderColor = showOnboarding ? colors.blueBG : colors.newBlue
    // PROD Animate screen loading
    // if (!isReady || !isAuthenticated)
      // return <Loading updateState={this.updateState} />;

    // DEV
    // if (!isAuthenticated)
    //   return null


    return (

      <Router navigationBarStyle={[navigationBarStyle,{borderTopColor: navBorderColor}]} titleStyle={titleStyle}>
        <Overlay key="overlay">
          <Modal key="root" hideNavBar={true}>
            <Lightbox key="lightbox">
              <Stack key="myStack"  hideBackImage back>
                <Scene key='Dashboard' component={Dashboard} title='' hideNavBar={false} initial={true} renderRightButton={() => <DashboardRightButton />}/>
                <Scene key='RecView' component={RecView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                <Scene key='FriendView' component={FriendView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                <Scene key='Register' component={Register} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                <Scene key='Profile' component={Profile} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
                <Scene key='LoggedOut' component={LoggedOut} title='LoggedOut' hideNavBar={false}  />
              </Stack>


              <Scene key='NewRecLightbox' component={RecInput} title=''hideNavBar={true} hideNavBar={true} />


              </Lightbox>
              <Scene key='NewRecLightboxModal' component={RecInput} title='' />


            </Modal>
          </Overlay>
        </Router>
    )
  }
  render_og() {
    const { showOnboarding, isAuthenticated, myRecsCount, user } = this.props
    const { isReady } = this.state

    // PROD Animate screen loading
    if (!isReady || !isAuthenticated)
      return <Loading updateState={this.updateState} />;

    // DEV
    // if (!isAuthenticated)
    //   return null

    return (

      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
        <Modal key="root" hideNavBar={true}>
          <Stack key="MainStack" initial={true} hideBackImage back>
            <Scene key='Dashboard' component={Dashboard} title='' hideNavBar={showOnboarding} initial={!showOnboarding} renderRightButton={() => <ProfileButton myRecsCount={myRecsCount} user={user} />}/>
            <Scene key='RecView' component={RecView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
            <Scene key='FriendView' component={FriendView} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
            <Scene key='Register' component={Register} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
            <Scene key='Profile' component={Profile} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
          </Stack>
          <Stack key="InputStack" back backTitle="Close" hideBackImage  backButtonTextStyle={{ color:'white' }}  >
            <Scene key='InputTitle' component={InputTitle} title='' hideNavBar={false} renderBackButton={() => <CloseButton />} />
            <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} renderBackButton={() => <BackButton />}/>
            <Scene key='ConfirmRecommendation'  component={ConfirmRecommendation} title='' hideNavBar={false} renderBackButton={() => <BackButton />} />
          </Stack>

          <Stack key="EditTitle"  >
            <Scene key='EditTitleScene' back component={InputTitle} title='Editing' hideNavBar={false} renderBackButton={() => <CloseButton />} />
          </Stack>

          <Scene key='LoggedOut' component={LoggedOut} title='LoggedOut' hideNavBar={false}  />
        </Modal>

        </Router>
    )
  }

  // render_tmp() {
  //   return (
  //     <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}>
  //       <Modal key="root" hideNavBar={false}>
  //       <Scene key='InputFriend' component={InputFriend} title='' hideNavBar={false} backTitle="Back"/>
  //       </Modal>
  //       </Router>
  //   )
  // }
}



export default Chaz;
