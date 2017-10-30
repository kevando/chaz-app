import React, { Component } from 'react';
import { LayoutAnimation, ListView, Alert } from 'react-native';
import Profile from './Profile';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this._onLogoutPress = this._onLogoutPress.bind(this)
  }

  // componentWillReceiveProps({user}) {
  //   if(!user.uid){ // User signed out!
  //     // this.setState({status: 'User Created!'})
  //     setTimeout(() => {
  //       Actions.reset('MainStack')
  //     }, 1000);
  //   }
  // }
  _onLogoutPress() {
    // Actions.push('LoggedOut')
    // return
    Alert.alert(
      'Log Out?', null,
      [
        {text: 'No' },
        {text: 'Yes', onPress: () => this.props.signOut(), },
      ]
    )
  }

  render() {
    // console.log(this.props)
      return (
        <Profile
          onLogoutPress={this._onLogoutPress}
          user={this.props.user}
          friends={this.props.friends}
          givenRecs={this.props.givenRecs}
        />
      )
  }
}

export default ProfileContainer;
