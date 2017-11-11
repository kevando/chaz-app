import React, { Component } from 'react';
import { LayoutAnimation, ListView, AlertIOS } from 'react-native';
import Profile from './Profile';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)

  }


  _onLogoutPress = () => {

    AlertIOS.prompt(
      'Developer Options', 'Option to change display name',
      [
        {text: 'Update Name', onPress: (text) => this.props.saveDisplayName(text) },
        {text: 'Log Out', onPress: () => this.props.signOut(), },
        {text: 'Refresh Token', onPress: () => this.props.refreshServerToken(), },
        {text: 'Turn Dev Mode On', onPress: () => this.props.setAppData({devMode: true}), },
        {text: 'Turn Dev Mode Off', onPress: () => this.props.setAppData({devMode: false}), },
        {text: 'Cancel', style: 'cancel'},
      ]
    )
  }
  _formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  render() {
    // console.log(this.props)
      return (
        <Profile
          formatedNumber={this._formatPhoneNumber(this.props.user.phoneNumber)}
          onLogoutPress={this._onLogoutPress}
          user={this.props.user}
          friends={this.props.friends}
          givenRecs={this.props.givenRecs}
          onlineFriends={this.props.onlineFriends}
        />
      )
  }
}

export default ProfileContainer;
