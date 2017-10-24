import React, { Component } from 'react';
import { LayoutAnimation, ListView, Alert } from 'react-native';
import Profile from './Profile';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   username: '',
    //   email: '',
    //   password: '',
    // };
    this._onLogoutPress = this._onLogoutPress.bind(this)
    // this._onProfilePress = this._onProfilePress.bind(this)
    // this._onLoginPress = this._onLoginPress.bind(this)
    // this._onGivePress = this._onGivePress.bind(this)
    // this.updateState = this.updateState.bind(this)
  }


  componentWillReceiveProps({user}) {
    if(!user.uid){ // User signed out!
      // this.setState({status: 'User Created!'})
      setTimeout(() => {
        Actions.pop()
      }, 1000);
    }
  }
  _onLogoutPress() {
    Alert.alert(
      'Log Out?', null,
      [
        {text: 'No' },
        {text: 'Yes', onPress: () => this.props.logoutUser(), },
      ]
    )
  
  }


  render() {
    console.log(this.props)
      return (
        <Profile
          onLogoutPress={this._onLogoutPress}
          user={this.props.user}
          friends={this.props.friends}
        />
      )



  }
}

export default ProfileContainer;
