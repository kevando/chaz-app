import React, {Component} from 'react';
import { View, Text } from 'react-native'
import styles, { navigationBarStyle, titleStyle } from './styles';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Scene, Router, Actions, Modal, Stack, } from 'react-native-router-flux';
// import firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';
// var PushNotification = require('react-native-push-notification');
import Dashboard from '../../routes/Dashboard';
import InputTitle from '../../routes/InputTitle';
import InputFriend from '../../routes/InputFriend';
import ConfirmRecommendation from '../../routes/ConfirmRecommendation';
import { CloseButton, BackButton, ProfileButton } from '../../components/Nav';
import RecView from '../../routes/RecView';
import FriendView from '../../routes/FriendView';
import Splash from '../../routes/Splash';
import Register from '../../routes/Register';
import Profile from '../../routes/Profile';



class Chaz extends Component {
  constructor(props) {
    super(props)
    this.state = { visibleToasts: 0 }
    this._renderToast = this._renderToast.bind(this)
    this._shouldToastDisplay = this._shouldToastDisplay.bind(this)
  }
  componentWillMount() {
    this.props.initializeApp() // redux
  }

  componentWillReceiveProps(nextProps) {
    this._shouldToastDisplay(nextProps)
  }

  _shouldToastDisplay(nextProps) {
    const { status, error } = this.props.app
    if(nextProps.app.status != status)
      this._renderToast(nextProps.app.status,'green')

    if(nextProps.app.error != error)
      this._renderToast(nextProps.app.error.message,'red')
  }

  _renderToast(message, color) {

    const OFFSET = this.state.visibleToasts * 60
    this.setState({visibleToasts: ++this.state.visibleToasts})

    let toast = Toast.show(message, {
        duration: 14000, //Toast.durations.LONG,
        position: Toast.positions.TOP + OFFSET,
        backgroundColor: color,
        onHidden: () => {
            this.setState({visibleToasts: --this.state.visibleToasts})
        }
    });
  }



  render() {
    const { showOnboarding, isAuthenticated, myRecsCount, user } = this.props

    if (!isAuthenticated)
      return null;

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
